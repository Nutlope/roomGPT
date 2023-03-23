import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb";

export type GenerateResponseData = {
  original: string | null;
  generated: string | null;
  id: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
    theme: string;
    room: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<GenerateResponseData | string>
) {
  // Check if user is logged in
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(500).json("Login to upload.");
  }

  // Get user from DB
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
    select: {
      credits: true,
    },
  });

  // Check if user has any credits left
  if (user?.credits === 0) {
    return res.status(400).json(`You have no generations left`);
  }

  // If they have credits, decrease their credits by one and continue
  await prisma.user.update({
    where: {
      email: session.user.email!,
    },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });

  try {
    const { imageUrl, theme, room } = req.body;
    const prompt =
      room === "Gaming Room"
        ? "a video gaming room"
        : `a ${theme.toLowerCase()} ${room.toLowerCase()}`;

    // POST request to Replicate to start the image restoration generation process
    let startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
        body: JSON.stringify({
          version:
            "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
          input: {
            image: imageUrl,
            prompt: prompt,
            scale: 9,
            a_prompt:
              "best quality, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning, interior design",
            n_prompt:
              "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
          },
        }),
      }
    );

    let jsonStartResponse = await startResponse.json();

    let endpointUrl = jsonStartResponse.urls.get;
    const originalImage = jsonStartResponse.input.image;
    const roomId = jsonStartResponse.id;

    // GET request to get the status of the image restoration process & return the result when it's ready
    let generatedImage: string | null = null;
    while (!generatedImage) {
      // Loop in 1s intervals until the alt text is ready
      let finalResponse = await fetch(endpointUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
      });
      let jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        generatedImage = jsonFinalResponse.output[1] as string;
      } else if (jsonFinalResponse.status === "failed") {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (generatedImage) {
      await prisma.room.create({
        data: {
          replicateId: roomId,
          user: {
            connect: {
              email: session.user.email!,
            },
          },
          inputImage: originalImage,
          outputImage: generatedImage,
          prompt: prompt,
        },
      });
    } else {
      throw new Error("Failed to restore image");
    }

    res.status(200).json(
      generatedImage
        ? {
            original: originalImage,
            generated: generatedImage,
            id: roomId,
          }
        : "Failed to restore image"
    );
  } catch (error) {
    // Increment their credit if something went wrong
    await prisma.user.update({
      where: {
        email: session.user.email!,
      },
      data: {
        credits: {
          increment: 1,
        },
      },
    });
    console.error(error);
    res.status(500).json("Failed to restore image");
  }
}

import type { NextApiRequest, NextApiResponse } from "next";

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
  // POST request to Replicate to start the image restoration generation process
  let predictonResponse = await fetch(
    "https://api.replicate.com/v1/predictions/tfda4hdsgncrpafun4ikywjbve",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    }
  );

  let jsonStartResponse = await predictonResponse.json();

  console.log({ jsonStartResponse });
  res.status(200).json(jsonStartResponse);
}

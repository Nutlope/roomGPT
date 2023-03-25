import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb";
import requestIp from "request-ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if user is logged in
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    console.log("User not logged in");
    return res.status(401).json("Login to upload.");
  }

  // Query the database by email to get the number of generations left
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
    select: {
      credits: true,
      location: true,
    },
  });

  if (!user?.location) {
    const ip = requestIp.getClientIp(req);
    const location = await fetch(
      `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`
    ).then((res) => res.json());

    await prisma.user.update({
      where: {
        email: session.user.email!,
      },
      data: {
        location: location.country_code,
      },
    });

    console.log(`Updated user location to ${location.country_code}`);
  }

  return res.status(200).json({ remainingGenerations: user?.credits });
}

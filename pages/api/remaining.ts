import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../utils/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

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

  // Query the redis database by email to get the number of generations left
  const identifier = session.user.email;
  const windowDuration = 24 * 60 * 60 * 1000;
  const bucket = Math.floor(Date.now() / windowDuration);

  const usedGenerations =
    (await redis?.get(`@upstash/ratelimit:${identifier!}:${bucket}`)) || 0;

  const remainingGenerations =
    Number(usedGenerations) > 3 ? 0 : 3 - Number(usedGenerations);

  return res.status(200).json({ remainingGenerations });
}

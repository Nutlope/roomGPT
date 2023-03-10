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
    return res.status(500).json("Login to upload.");
  }

  // Query the redis database by email to get the number of generations left
  const identifier = session.user.email;
  const windowDuration = 24 * 60 * 60 * 1000;
  const bucket = Math.floor(Date.now() / windowDuration);

  const usedGenerations =
    (await redis?.get(`@upstash/ratelimit:${identifier!}:${bucket}`)) || 0;

  // Move this using date-fns on the client-side
  const resetDate = new Date();
  // Check if the current time is before 7pm EST
  if (resetDate.getUTCHours() < 23) {
    // 23 is equivalent to 7pm EST in UTC
    // If before 7pm EST, set the time to 7pm EST
    resetDate.setUTCHours(19, 0, 0, 0);
  } else {
    // If after 7pm EST, add one day and set the time to 7pm EST
    resetDate.setDate(resetDate.getDate() + 1); // Add one day
    resetDate.setUTCHours(19, 0, 0, 0);
  }
  const diff = Math.abs(resetDate.getTime() - new Date().getTime());
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60) - hours * 60;

  const remainingGenerations =
    Number(usedGenerations) > 5 ? 0 : 5 - Number(usedGenerations);

  return res.status(200).json({ remainingGenerations, hours, minutes });
}

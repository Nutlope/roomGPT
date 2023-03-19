// Script to get all user emails from DB and add them to a newsletter

// TODO: Need to also use prod DB instead of the test one

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import ObjectsToCsv from "objects-to-csv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const count = await prisma.user.count();
  // return res.status(200).json({ count });

  let userEmails = await prisma.user.findMany({
    select: {
      email: true,
    },
  });

  console.log({ userEmails });

  let rooms = await prisma.room.findMany();

  const csv = new ObjectsToCsv(userEmails);
  await csv.toDisk("./userEmails.csv");

  res.status(200).json("success");
}

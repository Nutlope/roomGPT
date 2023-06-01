import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const headersList = headers();
  // console.log({ headersList });
  const referer = headersList.get("x-real-ip");
  // const ref = headersList.get("Referer");
  console.log({ referer });

  return new Response(referer);
}

import { Redis } from "@upstash/redis";

const redis = new Redis({
  // @ts-ignore
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;

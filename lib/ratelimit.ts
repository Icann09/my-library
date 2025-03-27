import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; 
import { Redis } from "@upstash/redis";


const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});


export default ratelimit;
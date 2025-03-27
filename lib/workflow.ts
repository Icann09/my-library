import config from "./config"
import { Client as WorkFlowClient } from "@upstash/workflow"


export const workflowClient = new WorkFlowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});
//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

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-3U9ymM8BB8EEx0zERLnGWtg4",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

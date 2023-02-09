const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-3U9ymM8BB8EEx0zERLnGWtg4",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;
app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({ message: response.data.choices[0].text });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

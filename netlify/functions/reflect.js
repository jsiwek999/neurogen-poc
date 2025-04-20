const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body || "{}");
  const userInput = body.message;

  const openAIKey = process.env.OPENAI_API_KEY;
  if (!openAIKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing OpenAI API key" }),
    };
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAIKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are NeuroGen, a mythic reflection engine." },
        { role: "user", content: userInput },
      ],
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      reply: data.choices?.[0]?.message?.content || "No reply from model.",
    }),
  };
};

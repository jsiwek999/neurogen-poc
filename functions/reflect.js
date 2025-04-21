const fetch = require('node-fetch');

exports.handler = async function(event) {
  const body = JSON.parse(event.body);
  const userInput = body.text;

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing OpenAI API key' }),
    };
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a reflection assistant helping users gain insight.' },
        { role: 'user', content: userInput }
      ]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.choices[0].message.content })
  };
};

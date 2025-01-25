const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Replace the OpenAI SDK with Axios
const API_KEY = "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";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    console.error("Invalid or missing 'prompt' in request body");
    return res.status(400).json({ error: "Invalid or missing 'prompt'" });
  }

  console.log("Received request with prompt:", prompt);

  try {
    // Use Axios to call the OpenAI API
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 512,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );

    // Send the response back to the client
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

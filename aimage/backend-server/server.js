import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: '512x512',
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

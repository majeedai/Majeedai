export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { symptoms } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful medical assistant. Based on symptoms described by a user, suggest the most appropriate medical specialty. Respond only with the specialty name (e.g., Cardiologist, Dermatologist).'
          },
          {
            role: 'user',
            content: symptoms
          }
        ],
        temperature: 0.2,
        max_tokens: 50
      })
    });

    console.log("OpenAI response status:", response.status);

    const data = await response.json();
    console.log("OpenAI full response:", JSON.stringify(data));

    const specialty = data.choices?.[0]?.message?.content?.trim();

    res.status(200).json({ specialty: specialty || "No result returned" });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res
      .status(500)
      .json({ error: 'AI request failed', message: error.message || 'Unknown error' });
  }
}

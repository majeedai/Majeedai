export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { symptoms } = req.body;

  const prompt = `You are a medical assistant. Based on the user's symptoms, suggest the most appropriate medical specialty. Respond with only the specialty name.\n\nSymptoms: ${symptoms}`;

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 30,
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    // ✅ DEBUG LOGGING
    console.log("Raw OpenAI response:", JSON.stringify(data));

    const specialty = data.choices?.[0]?.text?.trim();

    res.status(200).json({ specialty: specialty || "No result returned" });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
}


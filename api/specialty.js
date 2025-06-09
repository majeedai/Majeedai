export default async function handler(req, res) {
  const { symptoms, lang } = req.body;

  const prompt = lang === 'ar'
    ? `ما هو التخصص الطبي الأنسب للمريض الذي يعاني من الأعراض التالية: "${symptoms}"؟`
    : `What is the most suitable medical specialty for a patient with the following symptoms: "${symptoms}"?`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: "system", content: "You are a medical triage assistant. Return only the medical specialty name." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    const specialty = data.choices?.[0]?.message?.content?.trim();

    res.status(200).json({ specialty });
  } catch (error) {
    res.status(500).json({ error: "AI request failed", details: error.message });
  }
}

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
        model: 'gpt-3.5-turbo', // ✅ switched to available model
        messages: [
  {
    role: 'system',
    content: `You are a bilingual medical assistant. The user will describe symptoms in either Arabic or English. Respond ONLY with the most appropriate medical specialty — in the SAME language the user used. No sentences. No explanation. Just the specialty name.`
  },
  {
    role: 'user',
    content: 'I have chest pain and shortness of breath'
  },
  {
    role: 'assistant',
    content: 'Cardiologist'
  },
  {
    role: 'user',
    content: 'I am losing hair and my skin is itchy'
  },
  {
    role: 'assistant',
    content: 'Dermatologist'
  },
  {
    role: 'user',
    content: 'أعاني من ألم في الخصيتين'
  },
  {
    role: 'assistant',
    content: 'طبيب مسالك بولية'
  },
  {
    role: 'user',
    content: 'أشعر بقلق دائم ولا أستطيع النوم'
  },
  {
    role: 'assistant',
    content: 'طبيب نفسي'
  },
  {
    role: 'user',
    content: symptoms
  }
]

,
        temperature: 0.2,
        max_tokens: 50
      })
    });

    const data = await response.json();
    console.log("🔍 Raw OpenAI API Response:", JSON.stringify(data, null, 2));

    const raw = data.choices?.[0]?.message?.content || '';
    const specialty = raw.trim().split('\n')[0];

    res.status(200).json({ specialty: specialty || "No result returned" });
  } catch (error) {
    console.error("🔥 OpenAI API Error:", error);
    res.status(500).json({ error: 'AI request failed', message: error.message || 'Unknown error' });
  }
}

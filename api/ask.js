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
        model: 'gpt-4',  // ✅ switched to available model
       messages: [
  {
    role: 'system',
    content: `You are a bilingual medical assistant. The user will describe symptoms in Arabic or English. You must reply with BOTH the most appropriate general medical specialty and subspecialty — in the SAME language as the user. Use this format:
    
English:
Specialty: [general specialty]
Subspecialty: [subspecialty]

Arabic:
التخصص: [التخصص العام]
التخصص الدقيق: [التخصص الدقيق]

Keep it short. Do not write anything else. No explanations.`
  },

  // English examples
  { role: 'user', content: 'I have chest pain and shortness of breath' },
  { role: 'assistant', content: 'Specialty: Internal medicine\nSubspecialty: Cardiology' },

  { role: 'user', content: 'I have itchy skin and hair loss' },
  { role: 'assistant', content: 'Specialty: Dermatology\nSubspecialty: Alopecia and hair disease' },

  { role: 'user', content: 'I’m depressed and can’t sleep' },
  { role: 'assistant', content: 'Specialty: Psychiatry\nSubspecialty: Adult psychiatry' },

  { role: 'user', content: 'My child has epilepsy' },
  { role: 'assistant', content: 'Specialty: Neurology\nSubspecialty: Pediatric neurology' },

  { role: 'user', content: 'I see floaters and flashing lights in my vision' },
  { role: 'assistant', content: 'Specialty: Ophthalmology\nSubspecialty: Medical retina' },

  // Arabic examples
  { role: 'user', content: 'أعاني من ارتفاع ضغط الدم وألم في الصدر' },
  { role: 'assistant', content: 'التخصص: الباطنة\nالتخصص الدقيق: القلب' },

  { role: 'user', content: 'أشعر بحكة وتساقط في الشعر' },
  { role: 'assistant', content: 'التخصص: الجلدية\nالتخصص الدقيق: أمراض الشعر والصلع' },

  { role: 'user', content: 'أعاني من الحول منذ الطفولة' },
  { role: 'assistant', content: 'التخصص: العيون\nالتخصص الدقيق: الحول عند الكبار' },

  { role: 'user', content: 'طفلي يعاني من نوبات تشنج' },
  { role: 'assistant', content: 'التخصص: الأعصاب\nالتخصص الدقيق: أعصاب الأطفال' },

  // Final user input
  { role: 'user', content: symptoms }
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

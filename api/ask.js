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
    content: `You are a bilingual medical assistant. The user will describe symptoms in either Arabic or English. Your job is to respond with ONLY the most appropriate medical **subspecialty** name — in the SAME language the user used. Do not explain. Do not answer with full sentences. Only return the subspecialty name.`
  },

  // English examples
  { role: 'user', content: 'I have chest pain and shortness of breath' },
  { role: 'assistant', content: 'Cardiology' },

  { role: 'user', content: 'I feel bloated and have stomach pain after eating' },
  { role: 'assistant', content: 'Gastroenterology' },

  { role: 'user', content: 'I’m feeling sad and can’t sleep for weeks' },
  { role: 'assistant', content: 'Adult psychiatry' },

  { role: 'user', content: 'My child has epilepsy' },
  { role: 'assistant', content: 'Pediatric neurology' },

  { role: 'user', content: 'I have frequent urination and blood in urine' },
  { role: 'assistant', content: 'Urology' },

  { role: 'user', content: 'I have blurry vision and flashes of light' },
  { role: 'assistant', content: 'Medical retina' },

  { role: 'user', content: 'My skin is itchy and red after laser treatment' },
  { role: 'assistant', content: 'Lasers (dermatology)' },

  { role: 'user', content: 'I’m experiencing hair thinning and scalp patches' },
  { role: 'assistant', content: 'Alopecia and hair disease' },

  // Arabic examples
  { role: 'user', content: 'أعاني من فقدان التوازن ودوخة مستمرة' },
  { role: 'assistant', content: 'أمراض الحركة' },

  { role: 'user', content: 'طفلي يعاني من تشنجات متكررة' },
  { role: 'assistant', content: 'أعصاب الأطفال' },

  { role: 'user', content: 'أعاني من التهاب مفاصل مزمن' },
  { role: 'assistant', content: 'الروماتيزم' },

  { role: 'user', content: 'أشكو من عدم الإنجاب منذ سنوات' },
  { role: 'assistant', content: 'عقم الرجال' },

  { role: 'user', content: 'أعاني من الحول منذ الطفولة' },
  { role: 'assistant', content: 'طبيب الحول' },

  { role: 'user', content: 'أشعر بألم حاد في الشبكية وفقدان جزء من الرؤية' },
  { role: 'assistant', content: 'جراحة الشبكية' },

  // Final user input placeholder
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

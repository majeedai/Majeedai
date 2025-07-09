export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, language } = req.body;

  if (!prompt || !language) {
    return res.status(400).json({ error: 'Missing prompt or language' });
  }

  try {
    const systemMessage =
      language === 'ar'
        ? 'أنت مساعد طبي محترف. قم بتحليل الشكوى التي يكتبها المريض وحدد التخصص الطبي العام والتخصص الدقيق المناسبين. إذا كانت هناك أكثر من احتمال، فاذكر جميع الخيارات الطبية المرتبطة بشكل دقيق، وبدون شرح أو تعليق إضافي.'
        : 'You are a professional medical assistant. Analyze the patient’s complaint and suggest the most appropriate general and subspecialty. If more than one possibility exists, mention all possible medical specialty options. Do not provide any explanation.';

    const userMessage =
      language === 'ar'
        ? `الشكوى: ${prompt}`
        : `Complaint: ${prompt}`;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.5,
      }),
    });

    const data = await openaiRes.json();
    console.log('🔍 Raw OpenAI API Response:', JSON.stringify(data, null, 2));

    const content = data?.choices?.[0]?.message?.content || '';
    const specialty = content.trim();

    res.status(200).json({ specialty: specialty || 'No result returned' });
  } catch (error) {
    console.error('🔥 OpenAI API Error:', error);
    res.status(500).json({ error: 'AI request failed', message: error.message });
  }
}

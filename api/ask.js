export default async function handler(req, res) {
  try {
    const userPrompt = req.body.prompt;
    const language = req.body.language || 'en';

    if (!userPrompt || typeof userPrompt !== 'string') {
      return res.status(400).json({ error: 'Invalid user input' });
    }

    const systemPrompt =
      language === 'ar'
        ? `أنت مساعد طبي ذكي. المستخدم سيقدم أعراضًا، ومهمتك هي اقتراح التخصص الطبي الأنسب من بين التخصصات المعروفة. إذا كان هناك تخصص دقيق مناسب، فاذكر التخصص العام أولاً ثم التخصص الدقيق. استخدم هذا الشكل:
التخصص العام: [الاسم]
التخصص الدقيق: [الاسم أو لا يوجد]`
        : `You are a smart medical assistant. The user will input symptoms, and your job is to suggest the most suitable general medical specialty from a known list. If a matching subspecialty exists, include it too. Use this format:
General Specialty: [name]
Subspecialty: [name or N/A]`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.2
      })
    });

    const data = await response.json();
    console.log('🔍 Raw OpenAI API Response:', JSON.stringify(data, null, 2));

    const content = data.choices?.[0]?.message?.content || '';

    let generalSpecialty = '';
    let subSpecialty = '';

    const generalMatch = content.match(/(?:General Specialty|التخصص العام)[:：]?\s*(.+)/i);
    const subMatch = content.match(/(?:Subspecialty|التخصص الدقيق)[:：]?\s*(.+)/i);

    if (generalMatch) generalSpecialty = generalMatch[1].trim();
    if (subMatch) subSpecialty = subMatch[1].trim();

    if (!generalSpecialty) {
      return res.status(200).json({ specialty: 'No result returned' });
    }

    res.status(200).json({
      specialty: generalSpecialty,
      subspecialty: subSpecialty || ''
    });

  } catch (error) {
    console.error('🔥 OpenAI API Error:', error);
    res.status(500).json({ error: 'AI request failed', message: error.message || 'Unknown error' });
  }
}

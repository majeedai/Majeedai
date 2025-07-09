export default async function handler(req, res) {
  try {
    const { symptom, language } = req.body;

    // Construct system message based on language
    const systemMessage = language === 'ar'
      ? `أنت مساعد طبي. بناءً على الأعراض، اقترح دائمًا تخصصًا طبيًا عامًا و(عند الحاجة) تخصصًا دقيقًا.
✅ الصيغة المطلوبة للإجابة (لا تضف أي جمل إضافية):

التخصص العام: [اختر من القائمة أدناه]
التخصص الدقيق: [اختر من القائمة أدناه أو اتركه فارغًا إن لم يكن مناسبًا]

❗ استخدم فقط الأسماء من هذه القائمة:
- الطب العام
- طب الأطفال
- الجراحة العامة
- أمراض القلب
- طب العيون
- الأنف والأذن والحنجرة
- جراحة العظام
- الأمراض الجلدية
- الأمراض العصبية
- الطب النفسي
- أمراض الجهاز الهضمي
- أمراض الصدر
- أمراض الكلى
- أمراض الدم
- الأورام
- الروماتيزم
- الغدد الصماء
- الأمراض المعدية
- النساء والولادة
- المسالك البولية

تخصصات دقيقة محتملة:
- أمراض القلب التداخلية
- جراحة الشبكية
- جراحة العمود الفقري
- الأمراض المناعية
- أمراض الغدة الدرقية
- طب أعصاب الأطفال
- جراحة الأنف والجيوب الأنفية
- أمراض الرئة المزمنة
- وغيرها من التخصصات الدقيقة المقترنة بالتخصصات العامة المذكورة.`

      : `You are a medical assistant AI. Based on the patient's symptom, always suggest a general medical specialty and (if relevant) a subspecialty.
✅ Use this exact format:

General Specialty: [Choose from list below]
Subspecialty: [Choose from list below or leave blank if not applicable]

❗ Only use specialties from this list:
- General Practice
- Pediatrics
- General Surgery
- Cardiology
- Ophthalmology
- ENT
- Orthopedics
- Dermatology
- Neurology
- Psychiatry
- Gastroenterology
- Pulmonology
- Nephrology
- Hematology
- Oncology
- Rheumatology
- Endocrinology
- Infectious Diseases
- Obstetrics and Gynecology
- Urology

Subspecialties include:
- Interventional Cardiology
- Retina Surgery
- Spine Surgery
- Immunology
- Thyroid Disorders
- Pediatric Neurology
- Sinus Surgery
- Chronic Lung Disease
- and more paired with the above.`

    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: symptom }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.2
      })
    });

    const data = await response.json();
    console.log("🔍 Raw OpenAI API Response:", JSON.stringify(data, null, 2));

    const raw = data.choices?.[0]?.message?.content || '';
    const specialty = raw.trim().split('\n').join('\n');

    res.status(200).json({ specialty: specialty || "No result returned" });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    res.status(500).json({
      error: 'AI request failed',
      message: error.message || 'Unknown error'
    });
  }
}

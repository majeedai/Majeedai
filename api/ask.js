export default async function handler(req, res) {
  const { symptoms } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
  role: 'system',
  content: `You are a bilingual medical assistant. The user will describe symptoms in Arabic or English. You must reply with the most relevant general specialty and subspecialty — and if more than one option fits, return up to **three suggestions**, clearly separated and formatted.

✅ Match the user's input language. Never translate.

🧾 Format:

English (if one match):
Specialty: [General specialty]
Subspecialty: [Subspecialty]

English (if multiple matches):
Possible options:
1. Specialty: ...
   Subspecialty: ...
2. Specialty: ...
   Subspecialty: ...
3. Specialty: ...
   Subspecialty: ...

Arabic (if one match):
التخصص: [التخصص العام]
التخصص الدقيق: [التخصص الدقيق]

Arabic (if multiple matches):
الخيارات المحتملة:
١. التخصص: ...
   التخصص الدقيق: ...
٢. التخصص: ...
   التخصص الدقيق: ...
٣. التخصص: ...
   التخصص الدقيق: ...

Never include explanation. Never say “It depends.” Just give specialties.`
}

,

{
  role: 'user',
  content: 'أعاني من ضعف عام وخمول وتساقط شعر'
},
{
  role: 'assistant',
  content: `الخيارات المحتملة:
١. التخصص: الباطنة
   التخصص الدقيق: الغدد الصماء
٢. التخصص: الجلدية
   التخصص الدقيق: أمراض الشعر`
}
,

{
  role: 'user',
  content: 'I have chronic fatigue, hair loss, and weight gain'
},
{
  role: 'assistant',
  content: `Possible options:
1. Specialty: Internal Medicine
   Subspecialty: Endocrinology
2. Specialty: Dermatology
   Subspecialty: Hair Disorders`
}
,
          {
            role: 'user',
            content: 'I have chest pain and shortness of breath'
          },
          {
            role: 'assistant',
            content: 'Specialty: Internal medicine\nSubspecialty: Cardiology'
          },
          {
            role: 'user',
            content: symptoms
          },

          {
  role: 'user',
  content: 'أعاني من صداع شديد وتشوش في الرؤية'
},
{
  role: 'assistant',
  content: 'التخصص: الأعصاب\nالتخصص الدقيق: الصداع'
},

{
  role: 'user',
  content: 'أعاني من تورم في المفاصل وألم مزمن'
},
{
  role: 'assistant',
  content: 'التخصص: الباطنة\nالتخصص الدقيق: الروماتيزم'
},

{
  role: 'user',
  content: 'طفلي لا يتكلم ويقوم بحركات غريبة'
},
{
  role: 'assistant',
  content: 'التخصص: الأعصاب\nالتخصص الدقيق: أعصاب الأطفال'
},

{
  role: 'user',
  content: 'أعاني من فقدان تدريجي في النظر وذبابة طائرة'
},
{
  role: 'assistant',
  content: 'التخصص: العيون\nالتخصص الدقيق: الشبكية الطبية'
},

{
  role: 'user',
  content: 'أعاني من بقع جلدية وحكة مزمنة'
},
{
  role: 'assistant',
  content: 'التخصص: الجلدية\nالتخصص الدقيق: أمراض الجلدية'
}
,
{
  role: 'user',
  content: 'أعاني من ألم في أسفل الظهر'
},
{
  role: 'assistant',
  content: 'التخصص: العظام\nالتخصص الدقيق: العمود الفقري'
}
,

{
  role: 'user',
  content: 'أعاني من صداع شديد وتشوش في الرؤية'
},
{
  role: 'assistant',
  content: 'التخصص: الأعصاب\nالتخصص الدقيق: الصداع'
},

{
  role: 'user',
  content: 'أشعر بخفقان القلب وضيق في التنفس'
},
{
  role: 'assistant',
  content: 'التخصص: الباطنة\nالتخصص الدقيق: القلب'
},

{
  role: 'user',
  content: 'أعاني من آلام في المعدة وإسهال مستمر'
},
{
  role: 'assistant',
  content: 'التخصص: الباطنة\nالتخصص الدقيق: الجهاز الهضمي'
},

{
  role: 'user',
  content: 'أعاني من بقع جلدية حمراء وحكة مستمرة'
},
{
  role: 'assistant',
  content: 'التخصص: الجلدية\nالتخصص الدقيق: أمراض الجلدية'
},

{
  role: 'user',
  content: 'أشعر بألم في المفاصل وتورم في الركبة'
},
{
  role: 'assistant',
  content: 'التخصص: الباطنة\nالتخصص الدقيق: الروماتيزم'
},

{
  role: 'user',
  content: 'طفلي يعاني من التشنجات ولا يتحدث'
},
{
  role: 'assistant',
  content: 'التخصص: الأعصاب\nالتخصص الدقيق: أعصاب الأطفال'
},

{
  role: 'user',
  content: 'أشعر بضيق في النفس عند بذل مجهود بسيط'
},
{
  role: 'assistant',
  content: 'التخصص: الباطنة\nالتخصص الدقيق: الصدرية'
},

{
  role: 'user',
  content: 'أعاني من العطش الشديد والتبول المتكرر'
},
{
  role: 'assistant',
  content: 'التخصص: الباطنة\nالتخصص الدقيق: الغدد الصماء'
},

{
  role: 'user',
  content: 'أشعر بألم في الظهر عند الحركة'
},
{
  role: 'assistant',
  content: 'التخصص: العظام\nالتخصص الدقيق: العمود الفقري'
},

{
  role: 'user',
  content: 'ألاحظ فقدان تدريجي في النظر وذبابة طائرة'
},
{
  role: 'assistant',
  content: 'التخصص: العيون\nالتخصص الدقيق: الشبكية الطبية'
},

{
  role: 'user',
  content: 'أعاني من مشاكل في الحمل وتأخر في الإنجاب'
},
{
  role: 'assistant',
  content: 'التخصص: النساء والولادة\nالتخصص الدقيق: التناسلية والاخصاب'
},

{
  role: 'user',
  content: 'أعاني من الحزن المستمر وقلة النوم'
},
{
  role: 'assistant',
  content: 'التخصص: الطب النفسي\nالتخصص الدقيق: الطب النفسي العام'
},

{
  role: 'user',
  content: 'أعاني من ضعف في السمع وطنين بالأذن'
},
{
  role: 'assistant',
  content: 'التخصص: الأنف والأذن والحنجرة\nالتخصص الدقيق: السمعيات'
},

{
  role: 'user',
  content: 'أعاني من تورم في الساق وآلام شديدة بعد المشي'
},
{
  role: 'assistant',
  content: 'التخصص: الجراحة العامة\nالتخصص الدقيق: جراحة الأوعية الدموية'
}

        ]
      })
    });

    const data = await response.json();
    console.log("🔍 Raw OpenAI API Response:", JSON.stringify(data, null, 2));

    const raw = data.choices?.[0]?.message?.content || '';
res.status(200).json({ specialty: raw || "No result returned" });


  } catch (error) {
    console.error("❌ Error calling OpenAI:", error);
    res.status(500).json({ specialty: "Error processing request" });
  }
}

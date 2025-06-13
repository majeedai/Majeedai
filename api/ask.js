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
            content: `You are a bilingual medical assistant. The user will describe symptoms in Arabic or English. You must reply with BOTH the most appropriate general specialty and subspecialty — in the SAME language the user used.

✅ Always include both lines, even if the specialty and subspecialty are the same.

🧾 Format:

English:
Specialty: [General specialty]
Subspecialty: [Subspecialty]

Arabic:
التخصص: [التخصص العام]
التخصص الدقيق: [التخصص الدقيق]

No sentences. No explanation. Only the two lines.`
          },
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
          }

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

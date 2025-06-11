let currentLanguage = 'en';

console.log("script.js loaded");


async function suggestSpecialty() {
  const input = document.getElementById('symptomsInput').value;
  const resultDiv = document.getElementById('result');

  resultDiv.textContent = "Thinking...";

  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: input }),
    });

    const data = await res.json();
    resultDiv.innerHTML = data.specialty.replace(/\n/g, "<br>");

  } catch (err) {
    resultDiv.textContent = "Error contacting AI.";
  }
}


async function suggestSpecialty() {
  const input = document.getElementById('symptomsInput').value;
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = currentLanguage === 'ar' ? "جاري التفكير..." : "Thinking...";


  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ symptoms: input })
    });

    const data = await response.json();
    console.log("Response from API:", data);  // 👈 Add this
    resultDiv.textContent = `Suggested Specialty: ${data.specialty || "Error"}`;
  } catch (error) {
    console.error(error);
    resultDiv.textContent = "Something went wrong.";
  }
}

function switchLanguage(lang) {
  currentLanguage = lang;

  if (lang === 'ar') {
    document.getElementById('title').textContent = 'مجيدAI - ساعدني أجد الطبيب المناسب';
    document.getElementById('symptomsInput').placeholder = 'صف أعراضك...';
    document.getElementById('findBtn').textContent = 'ابحث عن التخصص';
    document.getElementById('resultLabel').textContent = 'التخصص المقترح:';
  } else {
    document.getElementById('title').textContent = 'MajeedAI - Find the Right Doctor';
    document.getElementById('symptomsInput').placeholder = 'Describe your symptoms...';
    document.getElementById('findBtn').textContent = 'Find Specialty';
    document.getElementById('resultLabel').textContent = 'Suggested Specialty:';
  }
}


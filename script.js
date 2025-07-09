let currentLanguage = 'en';

console.log("script.js loaded");


async function suggestSpecialty() {
  const userInput = document.getElementById('symptomsInput').value;

  if (!userInput || userInput.trim() === '') {
    resultDiv.textContent = 'Please enter a valid complaint.';
    return;
  }

  if (currentLanguage !== 'en' && currentLanguage !== 'ar') {
    resultDiv.textContent = 'Invalid language selection.';
    return;
  }

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: userInput,
        language: currentLanguage,
      }),
    });

    const data = await response.json();
    console.log('Response from API:', data);

    resultDiv.textContent = `Suggested Specialty: ${data.specialty || "No result returned"}`;
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


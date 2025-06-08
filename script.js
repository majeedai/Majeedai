let currentLang = 'en';

const translations = {
  en: {
    title: "MajeedAI - Find the Right Doctor",
    placeholder: "Describe your symptoms...",
    button: "Find Specialty",
    general: "General Medicine",
    result: "Suggested Specialty: ",
  },
  ar: {
    title: "ماجد AI - دليلك الطبي",
    placeholder: "صف الأعراض التي تعاني منها...",
    button: "اعرف التخصص",
    general: "الطب العام",
    result: "التخصص المقترح: ",
  }
};

function switchLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('title').textContent = t.title;
  document.getElementById('symptomsInput').placeholder = t.placeholder;
  document.getElementById('findButton').textContent = t.button;
  document.getElementById('result').textContent = '';
}

function suggestSpecialty() {
  const input = document.getElementById('symptomsInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  let specialty = translations[currentLang].general;

  const keywords = [
    { words: ["chest", "heart", "breath", "palpitation", "صدر", "قلب", "تنفس"], specialty: ["Cardiologist", "طبيب قلب"] },
    { words: ["skin", "rash", "itch", "acne", "طفح", "جلد", "حكة"], specialty: ["Dermatologist", "طبيب جلدية"] },
    { words: ["bone", "joint", "back", "knee", "كسور", "مفصل", "عظام"], specialty: ["Orthopedic Specialist", "طبيب عظام"] },
    { words: ["anxiety", "depression", "mental", "panic", "قلق", "اكتئاب", "ذهني"], specialty: ["Psychiatrist", "طبيب نفسي"] },
    { words: ["stomach", "digestion", "abdominal", "nausea", "بطن", "معدة", "غثيان"], specialty: ["Gastroenterologist", "طبيب جهاز هضمي"] },
  ];

  for (const group of keywords) {
    if (group.words.some(word => input.includes(word))) {
      specialty = currentLang === 'ar' ? group.specialty[1] : group.specialty[0];
      break;
    }
  }

  resultDiv.textContent = translations[currentLang].result + specialty;
}



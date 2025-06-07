function suggestSpecialty() {
  const input = document.getElementById('symptomsInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  let specialty = "General Medicine";

  const keywords = [
    { words: ["chest", "breathing", "heart", "palpitations"], specialty: "Cardiologist" },
    { words: ["skin", "rash", "acne", "eczema", "itching"], specialty: "Dermatologist" },
    { words: ["bone", "joint", "back", "knee", "arthritis", "fracture"], specialty: "Orthopedic Specialist" },
    { words: ["anxiety", "depression", "mental", "stress", "panic"], specialty: "Psychiatrist" },
    { words: ["stomach", "digestion", "abdominal", "nausea", "vomiting"], specialty: "Gastroenterologist" },
    { words: ["vision", "eye", "blurry", "redness"], specialty: "Ophthalmologist" },
    { words: ["diabetes", "thyroid", "hormone"], specialty: "Endocrinologist" },
    { words: ["pregnancy", "period", "uterus", "ovary"], specialty: "Gynecologist" },
    { words: ["asthma", "cough", "lungs"], specialty: "Pulmonologist" },
  ];

  for (const group of keywords) {
    if (group.words.some(word => input.includes(word))) {
      specialty = group.specialty;
      break;
    }
  }

  resultDiv.textContent = `Suggested Specialty: ${specialty}`;
}


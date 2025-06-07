function suggestSpecialty() {
  const input = document.getElementById('symptomsInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  let specialty = "General Medicine";

  if (input.includes("chest") || input.includes("breathing") || input.includes("heart")) {
    specialty = "Cardiologist";
  } else if (input.includes("skin") || input.includes("rash") || input.includes("acne")) {
    specialty = "Dermatologist";
  } else if (input.includes("bone") || input.includes("joint") || input.includes("back")) {
    specialty = "Orthopedic Specialist";
  } else if (input.includes("anxiety") || input.includes("depression") || input.includes("mental")) {
    specialty = "Psychiatrist";
  } else if (input.includes("stomach") || input.includes("digestion") || input.includes("abdominal")) {
    specialty = "Gastroenterologist";
  }

  resultDiv.textContent = `Suggested Specialty: ${specialty}`;
}

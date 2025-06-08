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
    resultDiv.textContent = `Suggested Specialty: ${data.specialty}`;
  } catch (err) {
    resultDiv.textContent = "Error contacting AI.";
  }
}



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
    resultDiv.textContent = `Suggested Specialty: ${data.specialty}`;
  } catch (err) {
    resultDiv.textContent = "Error contacting AI.";
  }
}


async function suggestSpecialty() {
  const input = document.getElementById('symptomsInput').value;
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = "Thinking...";

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


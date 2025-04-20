// neurogen.js

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send');
  const reflectionEl = document.getElementById('reflection');
  const responseEl   = document.getElementById('response');

  sendBtn.addEventListener('click', () => {
    const input = reflectionEl.value.trim();
    if (!input) {
      alert('Please type something first!');
      return;
    }

    // Echo back for now
    responseEl.textContent = input;

    // ↓ Later, swap this out for a fetch() to your GPT endpoint:
    /*
    fetch('https://your.api/reflect', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ text: input })
    })
    .then(res => res.json())
    .then(data => {
      responseEl.textContent = data.reply;
    })
    .catch(err => {
      console.error('Error talking to Neurogen API:', err);
      responseEl.textContent = 'Oops—something went wrong.';
    });
    */
  });
});

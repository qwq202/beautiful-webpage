async function callAI(prompt) {
  const key = document.getElementById('apiKey').value.trim();
  if (!key) {
    alert('请输入有效的 API Key');
    return;
  }
  const responseArea = document.getElementById('response');
  responseArea.textContent = '加载中...';
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100
      })
    });
    const data = await res.json();
    if (data.choices && data.choices.length > 0) {
      responseArea.textContent = data.choices[0].message.content.trim();
    } else {
      responseArea.textContent = '未获得回复。';
    }
  } catch (err) {
    responseArea.textContent = '请求失败：' + err.message;
  }
}

document.getElementById('sendBtn').addEventListener('click', () => {
  const prompt = document.getElementById('userInput').value.trim();
  if (prompt) {
    callAI(prompt);
  }
});


const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 10000;

const API_KEY = process.env.SOLAPI_API_KEY;
const API_SECRET = process.env.SOLAPI_API_SECRET;
const FROM = process.env.FROM_PHONE;

app.use(express.json());

app.post('/send', async (req, res) => {
  const { to, text } = req.body;

  if (!to || !text) {
    return res.status(400).json({ error: '전화번호(to)와 문자(text)를 모두 입력하세요.' });
  }

  try {
    const result = await axios({
      method: 'POST',
      url: 'https://api.solapi.com/messages/v4/send',
      headers: {
        Authorization: `Basic ${Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      data: {
        message: {
          to,
          from: FROM,
          text
        }
      }
    });

    res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    res.status(500).json({ error: '문자 전송 실패', detail: err.response?.data || err.message });
  }
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});

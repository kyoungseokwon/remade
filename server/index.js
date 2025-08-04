const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 10000;

// 환경변수
const API_KEY = process.env.SOLAPI_API_KEY;
const API_SECRET = process.env.SOLAPI_API_SECRET;
const FROM = process.env.FROM_PHONE;

app.use(express.json());

// 기본 확인용 라우트
app.get('/', (req, res) => {
  res.send('리메이드 서버 정상 작동 중!');
});

// 문자 전송 API
app.post('/send', async (req, res) => {
  const { to, text } = req.body;

  try {
    const response = await axios.post(
      'https://api.solapi.com/messages/v4/send',
      {
        message: {
          to,
          from: FROM,
          text,
        },
      },
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(API_KEY + ':' + API_SECRET).toString('base64'),
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ 문자 발송 완료:', response.data);
    res.status(200).json({ message: '문자 전송 성공', data: response.data });
  } catch (error) {
    console.error('❌ 문자 전송 실패:', error.response?.data || error.message);
    res.status(500).json({ error: '문자 전송 실패', details: error.response?.data });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});

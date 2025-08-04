const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

app.post('/send', (req, res) => {
  const { to, message } = req.body;
  // 여기서 Solapi 연동해서 문자 전송 로직 작성
  res.send('문자 전송 완료!');
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});

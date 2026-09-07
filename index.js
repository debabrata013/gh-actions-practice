const express = require('express');
const path = require('path');

const app = express();
const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

app.get('/health', (_req, res) => {
  res.status(200).send('Everything is running smooth');
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

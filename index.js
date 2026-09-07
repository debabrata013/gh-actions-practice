const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const publicDir = path.join(__dirname, 'public');
const landingPageLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(express.static(publicDir));

app.get('/health', (_req, res) => {
  res.status(200).send('Everything is running smooth');
});

app.get('/', landingPageLimiter, (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

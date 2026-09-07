const express = require('express');
const path = require('path');

const app = express();
const publicDir = path.join(__dirname, 'public');
const requestCounts = new Map();
const rateLimitWindowMs = 60 * 1000;
const maxRequestsPerWindow = 60;

app.use(express.static(publicDir));

function rateLimit(req, res, next) {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const current = requestCounts.get(key);

  if (!current || now - current.windowStart >= rateLimitWindowMs) {
    requestCounts.set(key, { count: 1, windowStart: now });
    return next();
  }

  if (current.count >= maxRequestsPerWindow) {
    return res.status(429).send('Too many requests, please try again later.');
  }

  current.count += 1;
  return next();
}

app.get('/health', (_req, res) => {
  res.status(200).send('Everything is running smooth');
});

app.get('/', rateLimit, (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

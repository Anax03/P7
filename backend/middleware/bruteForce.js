const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 900000, // 15 minutes
  max: 10, // 10 requêtes
  message: 'Essayez plus tard',
});

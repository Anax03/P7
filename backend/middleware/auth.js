// Imports
const jwt = require('jsonwebtoken');

// exporter la fonction  d'authentification
module.exports = (req, res, next) => {
  // Récupération du token
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    //Token verify

    jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, user) => {
      if (err) {
        /// Error status 403
        return res.status(403);
      }
      /// Next
      next();
    });
  }
  // Error statut 401 Unauthorized
  else {
    res.status(401).json({ error: 'accès non authorisé' });
  }
};

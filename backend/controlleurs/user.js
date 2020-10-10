const crypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

//database
const db = require('../connection');

///////////// Inscription
//// must be an valid email
//// password must be at least 8 chars long

exports.signup = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    ///Voir si l'email et mot de passe ,username sont des values valide
    if (!errors.isEmpty() || validUserName(req.body.username) == true) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Voir si l'email  existe déja
    else {
      const InscriptionEmail = req.body.email;
      db.query(
        'SELECT email FROM users WHERE email = ?',
        [InscriptionEmail],
        async (error, results) => {
          if (error) {
            //Error Database
            res.status(500).json({ error });
          } else if (results.length > 0) {
            //Si Email existe déja
            res.status(409).json({ error: 'Email is already in use' });
          } else {
            // Création du compte

            const hashedPassword = await crypt.hash(req.body.password, 10);
            db.query(
              'INSERT INTO users SET ?',
              {
                email: InscriptionEmail,
                username: req.body.username,
                password: hashedPassword,
                isAdmin: 0,
                createdAt: new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace('T', ' '),
                updatedAt: '00-00-00',
              },
              (error, results) => {
                if (error) {
                  res.status(500).json({ error });
                } else {
                  res.status(201).json({ message: 'Utilisateur créer' });
                }
              }
            );
          }
        }
      );
    }
  },
];

//////////////////// Login
/// Connexion d'utilisateur
exports.login = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res, next) => {
    if (
      req.body.email == process.env.adminWeb &&
      req.body.password == process.env.passwordWeb
    ) {
      const token = jwt.sign({ id: 54, isAdmin: true }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h',
      });
      res.status(200).json({
        userId: 54,
        token: token,
        isAdmin: true,
      });
    } else {
      const email = req.body.email;
      const password = req.body.password;
      /// Vérifier si l'utilisateur à remplis les champs email,password
      const errors = validationResult(req);
      ///Voir si l'email et mot de passe ,username sont des values valide
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        db.query(
          'SELECT * FROM users WHERE email = ?',
          [email],
          async (errors, results) => {
            // Si on as pas trouver email dans db
            if (results == 0) {
              /// Email incorrect
              res.status(401).json({ error: 'Email or password is incorrect' });
              /// Si on as trouver email dans db
            } else if (results.length > 0) {
              const comparePassword = await crypt.compare(
                password,
                results[0].password
              );
              // Si password incorrect
              if (!comparePassword) {
                // Password incorrect
                res
                  .status(401)
                  .json({ error: 'Email or password is incorrect' });
              }
              /// Si email + password correct
              else {
                /// Email + password correct
                const id = results[0].id;
                const isAdmin = results[0].isAdmin;
                const token = jwt.sign(
                  { id: id, isAdmin: isAdmin },
                  'RANDOM_TOKEN_SECRET',
                  {
                    expiresIn: '24h',
                  }
                );
                res.status(200).json({
                  userId: id,
                  token: token,
                  isAdmin: isAdmin,
                });
              }
            }
          }
        );
      }
    }
  },
];

////////////// Profile user :

exports.profile = (req, res) => {
  const id = getUserId(req.headers.authorization);

  db.query(
    'SELECT * FROM users WHERE id = ?',
    [id],
    async (errors, results) => {
      ///Error db
      if (errors) {
        
        res.status(500).json({ errors });
      } else if (results == 0) {
        /// Si l'id n'existe pas dans db
        
        res.status(500).json({ errors });
      } else {
        /// Récuperer le body d'utilisateur
       
        res.status(200).json(results[0]);
      }
    }
  );
};

/////////// Update Password

exports.updatePassword = [
  body('newPassword').isLength({ min: 8 }),
  async (req, res) => {
    ///////
    const id = getUserId(req.headers.authorization);
   
    const newPassword = req.body.newPassword;

    //vérifier si le nouveau mdp valide
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /// Changer le mdp
    else {
      db.query(
        'SELECT * FROM users WHERE id = ?',
        [id],
        async (errors, results) => {
          if (results == 0) {
            res.status(500).json({ errors });
          } else {
            /// Profile utilisateur
            const hashedPassword = await crypt.hash(newPassword, 10);

            db.query(
              'UPDATE users SET password = ? WHERE id = ?',
              [hashedPassword, id],
              (errors, results) => {
                if (results == 0) {
                  res.status(500).json({ error });
                } else {
                  res.status(201).json({ message: 'mot de passe modifié' });
                }
              }
            );
          }
        }
      );
    }
  },
];

////////// Supprimer compte
exports.delete = (req, res) => {
  const id = getUserId(req.headers.authorization);

  if (id !== null) {
    ////
    ///Supprimer les images
    db.query(
      'SELECT attachement from posts WHERE userId=?',
      [id],
      (errors, rows) => {
        if (errors) {
         
        } else {
          rows.forEach(function (row) {
            if (row.attachement) {
              const filename = row.attachement.split('/images/')[1];
              fs.unlink(`images/${filename}`, (err) => {
                if (err) {
                 
                } else {
                  
                }
              });
            }
          });
        }
      }
    );

    ///end

    ///Delete compte d'utilisateur

    db.query('DELETE FROM posts WHERE userId =?', [id], (errors, results) => {
      if (errors) {
        
      } else {
        
        db.query('DELETE FROM users WHERE id =?', [id], (errors, results) => {
          
          if (errors) {
           
            res.status(500).json({ error });
          } else {
           
            res.status(200).json({ message: 'compte supprimer' });
          }
        });
      }
    });
  }
};

// vérification input username

function validUserName(input) {
  const usernameRegex = /^[a-zA-Z ,.'-]+$/;
  return usernameRegex.test(input);
}

/// Function return user id avec l'aide du token
function getUserId(user) {
  if (user.length > 1) {
    const token = user.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.id;
      return userId;
    } catch (err) {
      return err;
    }
  }
}

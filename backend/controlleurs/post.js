const db = require('../connection');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

//// Create POST ...
exports.createPost = (req, res) => {
  
  let imageUrl = null;
  let imageSource=null;
  const id = getUserId(req.headers.authorization);
  const sanitizedString = req.sanitize(req.body.texte);
  

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
        /// Si l'utilisateur existe
        const user = results[0];
        const content = sanitizedString;

        // image
        if (req.file != undefined) {
          imageUrl = `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`;
          
          
          imageSource=imageUrl.replace(`${req.protocol}://${req.get('host')}`,'');
        } else {
          imageUrl = null;
          imageSource=null;
        }

        if (content === null && imageUrl === null) {
          res.status(400).json({ error: 'Aucun publication' });
        } else {
          //// Insert values on table posts
          db.query(
            'INSERT INTO posts SET ?',
            {
              userId: id,
              content: content,
              attachement: imageSource,
              username: user.username,
              createdAt: moment()
              .add(120, 'm')
              .tz('Europe/Paris')
              .format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment()
              .add(120, 'm')
              .tz('Europe/Paris')
              .format('YYYY-MM-DD HH:mm:ss'),
            },
            (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res.status(201).json(results);
              }
            }
          );
        }
      }
    }
  );
};

//// Get POSTS :

exports.getPosts = (req, res) => {
  db.query('SELECT * FROM posts', (errors, results) => {
    /// Si il ya pas de posts
    if (errors) {
      res.status(404).json(errors);
    }
    /// Cas contraire
    else {
      res.status(200).json(results);
    }
  });
};

/// Update POST  :

exports.updatePost = (req, res) => {
  /// récuperer id du utilisateur
  const id = getUserId(req.headers.authorization);
  const content = req.sanitize(req.body.texte);


  const postId = req.body.idPost;
  const postUserId = req.body.postUserId;
  const dateNow = moment()
    .add(120, 'm')
    .tz('Europe/Paris')
    .format('YYYY-MM-DD HH:mm:ss');
  const deleteImage = req.body.deleteImage;

  ///Delete image

  if (deleteImage) {
    db.query(
      'SELECT attachement from posts WHERE id=?',
      [postId],
      (errors, results) => {
        if (errors) {
        } else {
          
          //  Si il ya une image on le supprime
          if (results[0].attachement) {
            const filename = results[0].attachement.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
              if (err) {
                
              } else {
               
              }
            });
          }
        }
      }
    );
  }

  db.query('SELECT * FROM users where id =?', [id], (errors, results) => {
    if (errors) {
      res.status(404).json(errors);
    }
    /// Select user
    else {
      const userSelected = results[0];

      if (content == null && req.body.imageUrl == null) {
        res.status(404).json({ message: 'No content' });
      } else if (userSelected.isAdmin === 1 || postUserId === id) {
        db.query(
          'UPDATE posts SET content =?,attachement = ? ,createdAt = ? WHERE id=?',
          [content, req.body.imageUrl==null?null:req.body.imageUrl.replace(`${req.protocol}://${req.get('host')}`,''), dateNow, postId],
          (errors, results) => {
            if (errors) {
              res.status(401).json(errors);
              
            } else {
              res.status(200).json({ message: 'Post modifié' });
            }
          }
        );
      }
    }
  });
};

//// REMOVE POST :

exports.deletePost = (req, res) => {
  /// récuperer id du utilisateur

  const id = getUserId(req.headers.authorization);

  //// recupérer PostId + l'id du personne
  const params = req.params.id;
  const splitstring = params.split(':');
  const postID = Number(splitstring[0]);
  const postUserId = Number(splitstring[1]);

  db.query('SELECT * FROM users where id =?', [id], (errors, results) => {
    if (errors) {
      res.status(404).json(errors);
    }
    /// Select user
    else {
      const userSelected = results[0];
      if (userSelected.isAdmin == 1 || postUserId == id) {
        ///Supprimer fichier image
        db.query(
          'SELECT attachement from posts WHERE id=?',
          [postID],
          (errors, results) => {
            if (errors) {
            } else {
              
              //  Si il ya une image on le supprime
              if (results[0].attachement) {
                const filename = results[0].attachement.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                  if (err) {
                   
                  } else {
                   
                  }
                });
              }
            }
          }
        );

        db.query(
          'DELETE FROM posts WHERE id=?',
          [postID],
          (errors, results) => {
            
            if (errors) {
              res.status(401).json(errors);
            } else {
              res.status(200).json({ message: 'Post Supprimer' });
            }
          }
        );
      }
    }
  });
};

/// Function return user id avec l'aide du token
function getUserId(user) {
  if (user.length > 1) {
    const token = user.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      userId = decodedToken.id;
      return userId;
    } catch (err) {
      return err;
    }
  }
}

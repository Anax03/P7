Pour faire fonctionner le projet : \
dans le fichier /backend/.env \
rémplacer \
PORT=3000 \
USER=(Nom utilisateur mysql) \
PASSWORD=(Password utilisateur mysql) \
DATABASE=databaseGroupomania \

Puis utiliser la commande \
SOURCE ('Avec le repository du fichier 'GroupomaniaDatabase.sql') \
Pour la création d'une database avec les tables nécessaire + compte admin

Pour changer les droits d'administrations de l'utilisateur \
avec votre nom utilisateur mysql + mot de passe \
USE `databaseGroupomania`
UPDATE users SET isAdmin =1 WHERE email='(Email d'utilisateur)' \

pour lancer le serveur : \
npm install \
node server

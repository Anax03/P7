Pour faire fonctionner le projet : \
dans le fichier /backend/.env \
rémplacer \
PORT=3000 \
USER=(Nom utilisateur sql) \
PASSWORD=(Password utilisateur sql) \
DATABASE=databaseGroupomania \
adminWeb=admin@utilisateur.com \
passwordWeb=Admin\*\*\*000 \

Puis utiliser la commande \
SOURCE ('Avec le repository du fichier 'GroupomaniaDatabase.sql') \
Pour la création d'une database avec les tables nécessaire + compte admin \

pour lancer le serveur : \
npm install \
node server \

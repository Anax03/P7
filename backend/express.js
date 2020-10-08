const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const Cookiesession = require('cookie-session');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const app = express();

//body-parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cookies

expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  Cookiesession({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'example.com',
      path: 'foo/bar',
      expires: expiryDate,
    },
  })
);
//Helmet
app.use(helmet());

/// accéder à notre API depuis n'importe quelle origine
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

module.exports = app;

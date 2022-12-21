/* eslint-disable prettier/prettier */
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const dotenv = require('dotenv');

const User = require('./models/User');

dotenv.config({ path: '../../.env' });

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = process.env.MONGO_URL_TEST;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options);

const port = process.env.PORT || 8000;
const ROOT_URL = `http://localhost:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const MongoStore = mongoSessionStore(session);

  const sess = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 * 1000, // save session for 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      domain: 'localhost',
    },
  };

  server.use(session(sess));

  server.get('/', async (req, res) => {
    req.session.foo = 'bar';
    // const user = { email: 'team@builderbook.org' };
    const user = await User.findOne({ slug: 'team-builder-book' });
    app.render(req, res, '/', { user });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});

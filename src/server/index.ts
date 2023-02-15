import express from 'express';
import 'dotenv/config';
import path from 'path';
import  { db }  from '../db/index';
import passport from 'passport';
import session from 'express-session';

const { PORT } = process.env;
const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');
console.log(db);
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));
app.use(session({
  secret: 'typescript sucks lolipops.',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.get('/typescript', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`G'nawlinZ server listening on port http://localhost:${PORT}`);
});

import 'dotenv/config';
import path from 'path';
import  { db }  from '../db/index';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
//////import schemas//////
import User from '../db/user';
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
  // cookie: { maxAge: 1000 * 60 * 60 * 24 },
  // store //connect-mongodb-session // <-- above lines ?? new MemoryStore() ??
}));
app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
  },
 (accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return cb(err, user);
  });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }, (req, res) => {
    console.log('console.log req #1', req, 'res # 1', res);
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log('google #2', res);
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

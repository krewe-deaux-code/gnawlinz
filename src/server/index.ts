import 'dotenv/config';
import path from 'path';
// import { db } from '../db/index';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
//////import schemas//////
import User from '../db/user';
const { PORT } = process.env;
const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');
// console.log(db); // check DB connection
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));
app.use(session({
  secret: 'typescript is great.',
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
  callbackURL: "http://localhost:8080/auth/google/callback",
  // passReqToCallback: true
},
  (accessToken, refreshToken, profile, cb) => {
    console.log('GOOGLE', profile);
    User.findOrCreate({
      where: { googleId: profile.id, name: profile.name.givenName }
    })
      .then((user) => {
        return cb(null, user) // <-- serializeUser called here?
      }).catch((err) => {
        console.log('errrrrrr', err);
        return cb(err);
      })
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/'); // res.redirect('/~' + req.user.name); --> FOR FUTURE user specific render
  });

app.get('/', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.get('/typescript', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`G'nawlinZ server listening on port http://localhost:${PORT}`);
})
// Fix the Error EADDRINUSE
.on("error", (err) => {
  process.once("SIGUSR2", () => {
    process.kill(process.pid, "SIGUSR2");
  });
  process.on("SIGINT", () => {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, "SIGINT");
  });
});

//passport.use(User.createStrategy());
passport.serializeUser((user: any, done) => {
  console.log('SERIALIZE', user);
  const [ userCookie ] = user;
  const { dataValues } = userCookie;
  console.log('DATA VALUES --> COOKIE', dataValues);
  done(null, dataValues);
});

passport.deserializeUser((user: any, done) => {
  // const [ profile ] = response;
  // const { googleId } = profile;
  // User.findOne({
  //   where: {
  //     googleId
  //   }
  // }).then((user) => {
  //   console.log('USER?', user);
  //   done(null, user);
  // }).catch((err) => {
  //   done(err);
  // })
  console.log('DESERIALIZE USER', user);
  done(null, user);
});




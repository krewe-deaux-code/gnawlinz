import 'dotenv/config';
import passport from 'passport';

import User from '../../db/schemas/user';
import { Model } from 'sequelize';

import { Router } from 'express';
const Auth = Router();

// <-- may need to define these types -->
// declare module 'express-session' {
//   interface SessionData {
//     sessionID: any;
//   }
// }

// <-- Strategy -->
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID!,
  clientSecret: GOOGLE_CLIENT_SECRET!,
  callbackURL: "http://localhost:8080/auth/google/callback",
  passReqToCallback: true
},
  (req, accessToken, refreshToken, profile: any, cb) => {
    User.findOrCreate({
      where: {
        google_id: profile.id,
        name: profile.name.givenName,
        google_avatar: profile.photos[0].value
        // session_id: req.sessionID
      }
    })
      .then(([user, created]: [Model, boolean]) => {
        user.update({
          session_id: req.sessionID
        })
          .then((user) => cb(null, user)) // <-- serializeUser called here
          .catch((err) => {
            console.error('Instance update failed', err);
            return cb(err);
          });
        // return cb(null, user) // <-- serializeUser called here
      }).catch((err) => {
        console.log('Error User Model Google Verify CB', err);
        return cb(err);
      })
  }
));

Auth.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

Auth.get('/google/callback', (req, res) => {
  passport.authenticate('google', { failureRedirect: '/' },
    async () => {
      res.cookie('session_id', req.sessionID);
      res.redirect('/menu');
    })(req, res);
})

// Auth.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/menu'); // res.redirect('/~' + req.user.name); --> FOR FUTURE user specific render
//   });

passport.serializeUser((user: any, done) => {
  //console.log('SERIALIZE', user);
  const [userCookie] = user;
  const { dataValues } = userCookie;
  //console.log('DATA VALUES --> COOKIE', dataValues);
  done(null, dataValues);
});


passport.deserializeUser((user: any, done) => {
  console.log('DESERIALIZE USER', user);
  done(null, user);
});


export default Auth;

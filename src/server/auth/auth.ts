import 'dotenv/config';
import passport from 'passport';

import User from '../../db/schemas/user';

import { Router } from 'express';
const Auth = Router();

// <-- Strategy -->
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID!,
  clientSecret: GOOGLE_CLIENT_SECRET!,
  callbackURL: "http://localhost:8080/auth/google/callback",
},
  (accessToken, refreshToken, profile: any, cb) => {
    User.findOrCreate({
      where: {
        google_id: profile.id,
        name: profile.name.givenName,
        google_avatar: profile.photos[0].value
      }
    })
      .then((user) => {
        return cb(null, user) // <-- serializeUser called here
      }).catch((err) => {
        return cb(err);
      })
  }
));

Auth.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

Auth.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/'); // res.redirect('/~' + req.user.name); --> FOR FUTURE user specific render
  });

// <-- If User needs Local Strategy -->
//passport.use(User.createStrategy());

passport.serializeUser((user: any, done) => {
  console.log('SERIALIZE', user);
  const [ userCookie ] = user;
  const { dataValues } = userCookie;
  console.log('DATA VALUES --> COOKIE', dataValues);
  done(null, dataValues);
});

passport.deserializeUser((user: any, done) => {
  console.log('DESERIALIZE USER', user);
  done(null, user);
});

export default Auth;

//
// <-- IF DESERIALIZING NEEDS TO ACCESS DB -->
//
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








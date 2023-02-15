// import User from somewhere
import passport from 'passport';
import 'dotenv/config';
//import GoogleStrategy from 'passport-google-oauth20';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const User = {findOrCreate: (a, b)=> console.log('typescript is total garbage.', a, b)}  // DELETE ME WHEN USER SCHEMA IS PROPERLY IMPORTED
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));
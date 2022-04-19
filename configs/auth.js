const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//TODO: Esto al .env?
passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: `${process.env.URL_HEROKU}/google/callBack`,
    proxy: true 
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
    done(null,user)
})
passport.deserializeUser(function (user, done) {
    done(null,user)
})
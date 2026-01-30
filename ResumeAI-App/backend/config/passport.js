const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "https://resumeai-backend-v2.onrender.com/api/auth/google/callback",
    proxy: true, // ✅ Render.com ke liye required
    passReqToCallback: true
  },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google Profile Received:', profile.id);

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log('Existing user found:', user.email);
          user.lastLogin = new Date();
          user.isLoggedIn = true;
          await user.save();
          return done(null, user);
        } else {
          console.log('Creating new user:', profile.emails[0].value);
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos?.[0]?.value || '',
            isLoggedIn: true,
            lastLogin: new Date()
          });

          await newUser.save();
          return done(null, newUser);
        }
      } catch (err) {
        console.error('Passport Google Strategy Error:', err);
        return done(err, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      console.error('Deserialize Error:', err);
      done(err, null);
    }
  });
};
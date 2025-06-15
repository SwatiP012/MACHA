const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/api/auth/google/callback`,
      scope: ['profile', 'email']
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        console.log('Google profile data:', profile);
        
        // Get user email
        const email = profile.emails[0].value;
        
        // Check if user exists
        let user = await User.findOne({ email });
        
        if (user) {
          // Update existing user
          user.googleId = profile.id;
          user.name = user.name || profile.displayName;
          user.profileImage = user.profileImage || profile.photos?.[0]?.value;
          await user.save();
          return done(null, user);
        }
        
        // Create new user
        user = new User({
          googleId: profile.id,
          email,
          name: profile.displayName,
          profileImage: profile.photos?.[0]?.value,
          emailVerified: true,
          role: 'user' // Default role
        });
        
        await user.save();
        return done(null, user);
      } catch (error) {
        console.error('Google auth error:', error);
        return done(error, null);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;

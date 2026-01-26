// backend/routes/linkedinRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth',
  passport.authenticate('linkedin', { scope: ['r_liteprofile', 'r_emailaddress'] })
);

router.get('/callback',
  passport.authenticate('linkedin', { session: false }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/builder?linkedin=success`);
  }
);

module.exports = router;

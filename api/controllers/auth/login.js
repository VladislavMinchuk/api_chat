const passport = require('passport');

module.exports = (req, res) => {
  passport.authenticate('local',
    PassportService.passportAuth.bind(this, req, res))(req, res);
};
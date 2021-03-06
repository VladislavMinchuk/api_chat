/**
* isAuthenticated
* @description :: Policy to inject user in req via JSON Web Token
*/

const passport = require('passport');

module.exports = (req, res, next) => {
  console.log('isAuth');
  passport.authenticate('jwt', (error, user, info) => {
    if (error) return res.serverError(error);
    if (!user) return res.forbidden();
    req.user = user;

    next();
  })(req, res);
};

module.exports = {
  async localStrategy (email, password, next) {
    try {
      const user = await Users.findOne({ email: email });

      if (!user) {
        return next(null, false, {
            code: 'E_USER_NOT_FOUND',
            message: email + ' is not found'
        });
      }
  
      if (!AuthService.comparePassword(password, user.password)) {
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });
      }

      return next(null, user, {});
    } catch (err) {

      return next(err, false, {});
    }
  },
  passportAuth(req, res, error, user, info) {
    console.log(error, ' error')
    if (error) return res.serverError(error);

    if (!user) {
      return res.forbidden({code: info.code, message: info.message});
    }

    return res.ok({
      token: AuthService.createToken(user),
      user: user,
    });
  }
}
module.exports = {
  async localStrategy (email, password, next) {
    try {
      const user = await Users.findOne({ email: email });
  
      if (!user || !AuthService.comparePassword(password, user.password)) {
        return next(null, false, {
          message: 'Invalid email or password'
        });
      }

      return next(null, user, {});
    } catch (err) {
      return next(err, false, {});
    }
  },
  passportAuth (req, res, error, user, info) {
    if (error) return res.serverError(error);

    if (!user) {
      return res.status(401).json(info);
    }

    return res.ok({
      token: AuthService.createToken(user),
      user: user,
    });
  }
}
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * @param {String} password 
   */
  hashPassword (password) {
    if (password) return bcrypt.hashSync(password);
  },
  comparePassword (firstPassword, secondPassword) {
    return bcrypt.compareSync(firstPassword, secondPassword);
  },
  createToken (user) {
    return jwt.sign(
      {
        id: user.id
      },
      sails.config.custom.jwt.secretKey,
      {
        algorithm: sails.config.custom.jwt.algorithm,
        expiresIn: sails.config.custom.jwt.expiresIn,
        issuer: sails.config.custom.jwt.issuer,
        audience: sails.config.custom.jwt.audience
      }
    );
  },
  async jwtStrategy(req, jwt_payload, done) {
    try {
      const user = await Users.findOne({ id: jwt_payload.id });
  
      if (!user) {
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
}

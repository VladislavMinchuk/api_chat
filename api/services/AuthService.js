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
    console.log(sails.config.custom.jwt);
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
  jwtStrategy(req, jwt_payload, next) {
    console.log(req, jwt_payload, ' jwtStrategy');
    let user = jwt_payload.id;
    // do your things with user like recording usage of api
    return next(null, user, {});
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNyZWF0ZWRBdCI6MTYwMzM4NjU0MjU0OSwidXBkYXRlZEF0IjoxNjAzMzg2NTQyNTQ5LCJpZCI6MSwiZW1haWwiOiJ3QHcudyIsInBhc3N3b3JkIjoiJDJhJDEwJFAwdTNMQ2FKdldBencvdFhPRllSZHVEWWxNdTNWRkc3U0RtazZTS2FQemxsTm9GMnJGQnYuIn0sImlhdCI6MTYwMzM4Nzg0NiwiZXhwIjoxNjAzMzg5Mjg2LCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjEzMzciLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjEzMzcifQ.hfDSpdmjsYUdTBQ2EHTThACRFzyRRBPbgYijsI_G-64
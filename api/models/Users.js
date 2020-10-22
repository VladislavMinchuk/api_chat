const hashPassword = (user, next) => {
  user.password = AuthService.hashPassword(user.password);
  return next();
};

module.exports = {
  attributes: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },
  beforeUpdate: hashPassword,
  beforeCreate: hashPassword,
};

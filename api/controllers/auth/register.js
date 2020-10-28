module.exports = {
  friendlyName: 'Registration controller',

  inputs: {
    email: {
      description: 'User email',
      type: 'string'
    },
    password: {
      description: 'User password',
      type: 'string'
    }
  },

  exits: {
    success: {
      description: 'Success login'
    },
    serverError: {
      responseType: 'serverError',
      description: 'Server error'
    }
  },

  fn: async ({ email, password }) => {
    try {
      const user = await Users.create({ email, password }).fetch();

      return user;
    } catch (err) {
      throw 'serverError';
    }
  }
};
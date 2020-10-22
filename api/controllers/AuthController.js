/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
  register: async (req, res) => {
    try {
      const user = await Users.create(_.omit(req.allParams(), 'id')).fetch();
      console.log(user);
      return res.json(user);
    } catch (err) {
      res.serverError(err);
    }
  },
  login: (req, res) => {
      passport.authenticate('local',
          PassportService.passportAuth.bind(this, req, res))(req, res);
  },

};


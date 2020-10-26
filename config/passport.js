const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const AuthService = require('../api/services/AuthService');
const PassportService = require('../api/services/PassportService');
const { custom: { jwt } } = require('./custom');

const EXPIRES_IN_MINUTES = jwt.expiresIn;
const SECRET = jwt.secretKey;
const ALGORITHM = jwt.algorithm;
const ISSUER = jwt.issuer;
const AUDIENCE = jwt.audience;

const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

const JWT_STRATEGY_CONFIG = {
  expiresInMinutes: EXPIRES_IN_MINUTES,
  secretOrKey: SECRET,
  issuer: ISSUER,
  algorithm: ALGORITHM,
  audience: AUDIENCE,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true
};

passport.use( new LocalStrategy(LOCAL_STRATEGY_CONFIG, PassportService.localStrategy));
passport.use( new JwtStrategy(JWT_STRATEGY_CONFIG, AuthService.jwtStrategy));

module.exports.jwt = JWT_STRATEGY_CONFIG;

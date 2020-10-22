const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const AuthService = require('../api/services/AuthService');
const PassportService = require('../api/services/PassportService');

let EXPIRES_IN_MINUTES = process.env.JWT_EXPIRE_IN_MINUTE || 60 * 24;
let SECRET = process.env.JWT_SECRET || 'mysecret';
let ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
let ISSUER = process.env.JWT_ISSUER || 'http://localhost:1337';
let AUDIENCE = process.env.JWT_AUDIENCE || 'http://localhost:1337';

const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

const JWT_STRATEGY_CONFIG = {
  expiresInMinutes: EXPIRES_IN_MINUTES,
  secretOrKey: SECRET,
  // issuer: ISSUER,
  // algorithm: ALGORITHM,
  // audience: AUDIENCE,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true
};

passport.use( new LocalStrategy(LOCAL_STRATEGY_CONFIG, PassportService.localStrategy));
passport.use( new JwtStrategy(JWT_STRATEGY_CONFIG, AuthService.jwtStrategy));

module.exports.jwt = JWT_STRATEGY_CONFIG;

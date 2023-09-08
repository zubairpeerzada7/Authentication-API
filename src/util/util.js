const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Config } = require("../configs/config");

const generateToken = (user) => {
  return jwt.sign(user, Config.SECRET_JWT);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = (a, b) => {
  return bcrypt.compare(a, b);
};
module.exports = { hashPassword, generateToken, comparePassword };

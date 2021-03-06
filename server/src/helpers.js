const { JWT_SECRET } = require("./config");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function createToken(payload) {
  return new Promise((resolve, reject) => {
    JWT.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

module.exports = {
  createToken,
  hashPassword
};

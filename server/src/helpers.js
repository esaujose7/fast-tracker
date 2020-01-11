const { JWT_SECRET } = require("./config");
const JWT = require("jsonwebtoken");

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

module.exports = {
  createToken
};

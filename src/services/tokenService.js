const jwt = require('jsonwebtoken');

function generateToken(item) {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(item, secretKey);
  return token;
}

module.exports = {
  generateToken
}
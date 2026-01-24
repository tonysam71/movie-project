const jwt = require("jsonwebtoken");

let generatetoken = async (details, secretKey, expiretime) => {
  return jwt.sign(
    { ...details },
    secretKey,
    { expiresIn: expiretime }
  );
};

let decodetoken = async (token, secretKey) => {
  // ✅ VERIFY, not decode
  return jwt.verify(token, secretKey);
};

module.exports = { generatetoken, decodetoken };

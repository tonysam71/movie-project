let jwt = require("jsonwebtoken");

let generatetoken = async (details, secretKey, expiretime) => {
    let token = await jwt.sign({ ...details }, secretKey, { expiresIn: expiretime })
    return token
}
let decodetoken = async (token, secretKey) => {
    let decodedvalue = await jwt.decode(token, secretKey)
    return decodedvalue
}
module.exports = { generatetoken, decodetoken }
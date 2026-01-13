const bcrypt = require("bcrypt")

let hashpassword =   (password) => {
    return   bcrypt.hash(password, 10)
}
let comparepassword = async (password, hashedpassword) => {
    return await bcrypt.compare(password, hashedpassword)
}
module.exports = { hashpassword, comparepassword }
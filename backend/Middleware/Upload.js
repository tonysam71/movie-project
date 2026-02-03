const multer = require("multer")
const path = require("path")
let uploadpath = path.join(__dirname, "../uploads")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadpath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage });
module.exports = upload;
// req.files
// req.body

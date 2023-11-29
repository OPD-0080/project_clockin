const express = require("express");
const router = express.Router();
const multer = require("multer");

// MIDDLEWARE IMPORTATION
const { validate_register_field } = require("../controller/middleware");

// ...

const { register, login, logout } = require("./post_handlers");

// MULTER SECION FOR UPLOADING DATA
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            console.log("multer storage found");
            cb(null, "./public/storage/multer");
        }
        else {
            console.log("Uploaded file must be an image");
        }
        
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});
const upload = multer({ storage: storage });
// ...

router.post("/user/register", upload.single("photo"), validate_register_field, register);
router.post("/user/auth/login", login);
router.post("/user/auth/logout", logout);

module.exports = router

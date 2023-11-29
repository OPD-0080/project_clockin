const express = require("express");
const router = express.Router();

const { register, login, logout } = require("./get_handlers");

router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);

module.exports = router

const express = require("express");
const {
  registration,
  login,
  getUserinfo,
} = require("../controllers/userController");
const { validateToken } = require("../middlewares/auth");
const { upload } = require("../middlewares/uploadImage.js");

const router = express.Router();

// User routes
router.post("/register", upload.single("photo"), registration);
router.post("/login", login);
router.get("/userInfo", validateToken, getUserinfo);

module.exports = router;

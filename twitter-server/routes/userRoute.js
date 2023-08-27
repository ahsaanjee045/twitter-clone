const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { registerValidation, loginValidation } = require("../utils/validations");

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single("profilePicture");

const router = Router();

router.post("/register", upload, registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);

module.exports = router;

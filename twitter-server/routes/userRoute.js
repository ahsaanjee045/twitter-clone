const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  searchUser,
} = require("../controllers/userController");
const { registerValidation, loginValidation } = require("../utils/validations");

const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single("profilePicture");

const router = Router();

router.post("/register", upload, registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.get("/", authMiddleware, getAllUsers);
router.get("/search", authMiddleware, searchUser);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUsers,
    resendVerificationEmail,
    verifyEmail
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users", protect, admin, getUsers);

router.post("/verify-email", resendVerificationEmail);

router.get("/verify-email/:token", verifyEmail);


module.exports = router;
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const sendVerificationEmail = require("../utils/verifyEmail");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid user data"
            });
        }



await sendVerificationEmail(user);



        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: "Registration successful. Please verify your email."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (
            user &&
            (await bcrypt.compare(password, user.password))
        ) {

            if (!user.isVerified) {
                return res.status(403).json({
                    message: "Please verify your email before logging in."
                });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });

        } else {
            res.status(400).json({
                message: "Invalid user or password"
            });
        }

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getUsers = async (req, res) => {
    try {

        const users = await User
            .find({})
            .select("-password");

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


const resendVerificationEmail = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified"
            });
        }

        await sendVerificationEmail(user);

        res.json({
            message: "Verification email sent successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};


const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification link"
            });
        }

        user.isVerified = true;

        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;

        await user.save();

        await sendEmail(
            user.email,
            "MarketLane - Email Verified Successfully",
            `Hello ${user.name},

Your email has been successfully verified.

You can now log in to your MarketLane account.

Thank you,
MarketLane`
        );

        res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUsers,
    resendVerificationEmail,
    verifyEmail
};
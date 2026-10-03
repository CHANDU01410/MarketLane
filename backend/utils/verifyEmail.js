const crypto = require("crypto");
const sendEmail = require("./sendEmail");

const sendVerificationEmail = async (user) => {

    const token = crypto.randomBytes(32).toString("hex");

    user.verificationToken = token;
    user.verificationTokenExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

  const backendURL =
    process.env.BACKEND_URL || "http://localhost:5000";

const verificationLink =
    `${backendURL}/api/auth/verify-email/${token}`;

    await sendEmail(
        user.email,
        "Verify your MarketLane Email",
        `Hello ${user.name},

Please verify your email by clicking this link:

${verificationLink}

This link expires in 10 minutes.

Thank you,
MarketLane`
    );
};

module.exports = sendVerificationEmail;
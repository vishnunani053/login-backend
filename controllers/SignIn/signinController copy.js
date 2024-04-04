const { sign } = require("jsonwebtoken");
const signupModel = require("../../models/signupModel");
const bcrypt = require('bcrypt');

const signinController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email in the signup model
        const existingUser = await signupModel.findOne({ email });

        // If user does not exist, return error
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist",
                error: {
                    errorAt: "userName",
                    message: "User does not exist.",
                },
            });
        }

        // Compare hashed password from database with provided password
        const passwordMatched = await bcrypt.compare(password, existingUser.password);

        // If passwords do not match, return error            
        if (!passwordMatched) {
            return res.status(400).json({
                success: false,
                message: "Password did not match",
                error: {
                    errorAt: "password",
                    message: "Password did not match",
                },
            });
        }

        // If passwords match, generate JWT token
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const token = sign(JSON.stringify(existingUser), JWT_SECRET_KEY);

        // Return success message with token and user data
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { token, user: existingUser },
        });
    } catch (error) {
        // Handle errors
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = signinController;

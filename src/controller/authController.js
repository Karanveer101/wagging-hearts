const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    // Get email and password from request body
    const { email, password } = req.body;

    try {
        // Check if user exists in the database
        const user = await User.findOne({ email });

        // Validate password input with the user's hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const userId = user._id;
            const firstName = user.firstName;
            const role = user.role;
            const token = jwt.sign(
                {
                    email: email,
                    userId: userId,
                    firstName: firstName,
                    role: role,
                },
                "secret"
            );
            return res.status(200).json({
                message: "Login successful",
                token: token,
                role: role,
            });
        } else {
            res.status(400).json({
                message: "Incorrect email and/or password",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Incorrect email and/or password",
            error: error.message,
        });
    }
}

async function verifyJwtToken(req, res) {
    const jwtToken = req.headers.authorization.split(" ")[1]; //get jwt token from header
    console.log(jwtToken);

    const decoded = jwt.verify(jwtToken, "secret"); //verify the jwt token
    const role = decoded.role;
    console.log(decoded);

    if (decoded) {
        res.status(200).json({ message: "Access enabled by jwt token", role });
    } else {
        res.status(403).json({
            error: "Access denied, cannot verify jwt token",
        });
    }
}

module.exports = { login, verifyJwtToken };

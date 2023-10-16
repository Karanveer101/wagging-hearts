const User = require("../models/user");
const validation = require("../services/validation");
const hashingPassword = require("../services/hashingPassword");
const verifyJwtToken = require("../middleware/verifyJwtToken");

//register function
async function register(req, res) {
    const { firstName, lastName, email, password, confirmPassword, role } =
        req.body;

    const validationErrors = await validation.validateRegister(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role
    );

    const hashedPassword = await hashingPassword(password);
    console.log(hashedPassword);

    //if there is a validation error, send error messages to the client
    console.log(validationErrors);
    if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    //if there are no validation errros, create a new user
    try {
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        }).then((user) => {
            res.status(200).json({
                message: "User successfully created",
                user,
            });
        });
    } catch (error) {
        console.error("User not created:", error);
    }
}

//get user contact information
async function getUserData(req, res) {
    try {
        const decoded = await verifyJwtToken(req);
        const user = decoded.userId;
        console.log(user);

        const userData = await User.find(
            { _id: user },
            "firstName lastName email"
        ).exec();
        console.log(userData);

        res.status(200).json({
            message: "sent all user data",
            user: userData,
        });
    } catch (error) {
        console.error("Error fetching user data by the user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { register, getUserData };

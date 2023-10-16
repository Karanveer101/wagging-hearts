const validator = require("validator");
const User = require("../models/user");

function validateFirstName(firstName) {
    return validator.isByteLength(firstName, {
        min: 2,
        max: 20,
    });
}

function validateLastName(lastName) {
    return validator.isByteLength(lastName, {
        min: 2,
        max: 20,
    });
}

async function validateEmail(email) {
    //first check if the email is valid
    const validateEmail = validator.isEmail(email);

    if (!validateEmail) {
        return {
            isValid: false,
            message: "Email is invalid",
        };
    }

    //if email is valid, check if email exists in the database
    if (validateEmail) {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return { isValid: false, message: "User already exists" };
            } else
                return {
                    isValid: true,
                    message: "Email is valid and available",
                };
        } catch (error) {
            return {
                isValid: false,
                message: "An error occured while checking the email",
            };
        }
    }
}

function validatePassword(password) {
    return validator.isStrongPassword(password, [
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
        },
    ]);
}

function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword
}


//function to validate and return errors if they exist
async function validateRegister(
    firstName,
    lastName,
    email,
    password,
    confirmPassword
) {
    //errors array
    const errors = [];

    //validate first name
    if (!validateFirstName(firstName)) {
        const firstNameError =
            "First name should be between 2 and 20 characters in length";
        errors.push(firstNameError);
    }
    //validate last name
    if (!validateLastName(lastName)) {
        const lastNameError =
            "Last name should be between 2 and 20 characters in length";
        errors.push(lastNameError);
    }

    //validate email
    const emailValidateResult = await validateEmail(email);
    if (emailValidateResult.isValid === false) {
        const emailError = emailValidateResult.message;
        console.log(emailError);
        errors.push(emailError);
    }

    //validate password
    if (!validatePassword(password)) {
        const passwordError =
            "Password must be at least 8 characters and maximum 20 characters long. Include at least one uppercase letter, one lowercase letter, one digit, and one special character";
        errors.push(passwordError);
    }

    //validate password match
    if (!validatePasswordMatch(password, confirmPassword)) {
        const passwordMatchError = "passwords do not match";
        errors.push(passwordMatchError);
    }
    return errors;
}

module.exports = { validateRegister };

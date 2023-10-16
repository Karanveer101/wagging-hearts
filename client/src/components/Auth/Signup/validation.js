//strong password validation
function isStrongPassword(password) {
    //pasword length criteria
    const minLength = 8;
    const maxLength = 20;

    // Regular expressions for strong password criteria
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    //returns true if passes all tests, else returns false
    if (
        password.length >= minLength &&
        password.length <= maxLength &&
        hasUppercase &&
        hasLowercase &&
        hasDigit &&
        hasSpecialChar
    ) {
        return true;
    } else {
        return false;
    }
}

//validate sign up form
function validateForm(signUpData, setErrors, setValid) {
    const newErrors = {};

    // First name validation
    if (signUpData.firstName.length > 20) {
        newErrors.firstName = "First name cannot exceed 20 characters";
    }

    // Last name validation
    if (signUpData.lastName.length > 20) {
        newErrors.lastName = "Last name cannot exceed 20 characters";
    }

    // Email validation
    if (signUpData.email.length > 50) {
        newErrors.email = "Email cannot exceed 50 characters";
    }

    // Password validation
    if (!isStrongPassword(signUpData.password)) {
        newErrors.password =
            "Password must be at least 8 characters and maximum 20 characters long. Include at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }
    if (signUpData.password !== signUpData.confirmPassword) {
        newErrors.confirmPassword = "The passwords do not match";
    }

    // Set the new errors state
    setErrors(newErrors);

    // Set valid to true only if there are no errors
    setValid(Object.keys(newErrors).length === 0);
}

module.exports = { isStrongPassword, validateForm };

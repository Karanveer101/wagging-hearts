const bcrypt = require("bcrypt");

// Promisify the bcrypt.hash function
function hashPasswordAsync(password, saltRounds) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

// Function to hash the password using async/await
async function hashingPassword(password) {
    const saltRounds = 10;
    try {
        const hashedPassword = await hashPasswordAsync(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error; // Handle or propagate the error
    }
}

module.exports = hashingPassword ;

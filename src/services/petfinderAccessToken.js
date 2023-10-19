require("dotenv").config();
const axios = require("axios");

console.log(process.env.CLIENT_ID);
async function getAccessToken() {
    try {
        const response = await axios.post(
            "https://api.petfinder.com/v2/oauth2/token",
            {
                grant_type: "client_credentials",
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const accessToken = response.data.access_token;

        if (accessToken) {
            return accessToken;
        } else {
            throw new Error("Access token not found in response data");
        }
    } catch (error) {
        throw new Error(`Error retrieving access token: ${error.message}`);
    }
}

module.exports = getAccessToken;

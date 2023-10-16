require("dotenv").config();
async function getAccessToken() {
    try {
        const response = await fetch(
            "https://api.petfinder.com/v2/oauth2/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    grant_type: "client_credentials",
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                }),
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            const accessToken = data.access_token;
            return accessToken;
        } else {
            throw new Error("Unable to get access token");
        }
    } catch (error) {
        throw new Error(`Error retrieving access token: ${error.message}`);
    }
}

module.exports = getAccessToken;

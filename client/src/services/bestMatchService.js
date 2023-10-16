const getBestMatches = async (userPreferences) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST}api/dog/best-matches`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userPreferences),
            }
        );

        if (response.ok) {
            console.log("sucessfully fetched best match");
        } else {
            console.error("Error sending best match");
        }
    } catch (error) {
        console.error("Error fetching best match", error);
    }
};

module.exports = { getBestMatches };

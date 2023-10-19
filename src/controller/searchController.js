const axios = require("axios");
const getAccessToken = require("../services/petfinderAccessToken");

// Home page dog display
async function homeDogDisplay(req, res) {
    try {
        const accessToken = await getAccessToken();

        const apiUrl =
            "https://api.petfinder.com/v2/animals?type=dog&age=baby&limit=100";

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const data = response.data;
            // Filter dogs with photos
            const dogsWithPhotos = data.animals.filter(
                (dog) => dog.photos.length > 0
            );

            console.log(
                "Dogs with photos fetched successfully for home page display",
                dogsWithPhotos
            );

            return res.json({ animals: dogsWithPhotos });
        } else {
            throw new Error("Unable to fetch dogs for home page display");
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "Error fetching dogs for home display" });
    }
}

// Search dogs based on breed and location
async function search(req, res) {
    try {
        // Get accessToken
        const accessToken = await getAccessToken();

        const breed = req.query.breed;
        const location = req.query.location;

        // Make the API request
        const apiUrl = `https://api.petfinder.com/v2/animals?&breed=${breed}&location=${location}&limit=100`;

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const responseData = response.data;
            console.log(responseData);
            return res.json(responseData); // Send the API response data
        } else {
            throw new Error("Unable to get dogs");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving dogs" });
    }
}

// Search dogs based on breed and location
async function searchById(req, res) {
    try {
        // Get accessToken
        const accessToken = await getAccessToken();

        const dogId = req.query.id;

        // Make the API request
        const apiUrl = `https://api.petfinder.com/v2/animals/${dogId}`;

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const responseData = response.data;
            console.log(responseData);
            return res.json(responseData); // Send the API response data
        } else {
            throw new Error("Unable to get dog by id");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving dog by id" });
    }
}

module.exports = { search, homeDogDisplay, searchById };

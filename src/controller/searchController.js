const getAccessToken = require("../services/petfinderAccessToken");

//home page dog display
async function homeDogDisplay(req, res) {
    try {
        const accessToken = await getAccessToken();

        const apiUrl =
            "https://api.petfinder.com/v2/animals?type=dog&age=baby&limit=100";

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Filter dogs with photos
            const dogsWithPhotos = data.animals.filter(
                (dog) => dog.photos.length > 0
            );

            console.log(
                "dogs with photos fetched successfully for home page display",
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

//search dogs based on breed and location
async function search(req, res) {
    try {
        // Get accessToken
        const accessToken = await getAccessToken();

        const breed = req.query.breed;
        const location = req.query.location;

        // Make the API request
        const apiUrl = `https://api.petfinder.com/v2/animals?&breed=${breed}&location=${location}&limit=100`;

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
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

//search dogs based on breed and location
async function searchById(req, res) {
    try {
        // Get accessToken
        const accessToken = await getAccessToken();

        const dogId = req.query.id;

        // Make the API request
        const apiUrl = `https://api.petfinder.com/v2/animals/${dogId}`;

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
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

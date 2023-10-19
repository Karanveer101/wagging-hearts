const getAccessToken = require("../services/petfinderAccessToken");
const axios = require("axios");

async function getBestMatches(req, res) {
    const { breed, age, size, gender, houseTrained } = req.body;

    try {
        const accessToken = await getAccessToken();

        const apiUrl = `https://api.petfinder.com/v2/animals?type=dog&breed=${breed}&limit=100`;

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

            // Assign a score to each dog
            const dogsWithScore = dogsWithPhotos.map((dog) => {
                let score = 0;

                // Calculate score based on matching criteria and scoringSystem values
                if (dog.age.toString().toLowerCase() === age) {
                    score += 1;
                }
                if (dog.size.toString().toLowerCase() === size.toLowerCase()) {
                    score += 1;
                }
                if (dog.gender.toString().toLowerCase() === gender) {
                    score += 1;
                }
                if (
                    dog.attributes.house_trained.toString().toLowerCase() ===
                    houseTrained
                ) {
                    score += 1;
                }

                // Assign the calculated score as a property to each dog object
                return { ...dog, score };
            });

            // Sort from highest to lowest score
            const sortByScore = dogsWithScore.sort((a, b) => b.score - a.score);

            // Get the top 10 matches
            const bestMatches = sortByScore.slice(0, 10);

            return res.json(bestMatches);
        } else {
            throw new Error("Unable to get dogs");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving dogs" });
    }
}

module.exports = { getBestMatches };

const getAccessToken = require("../services/petfinderAccessToken");

//get the best matches
async function getBestMatches(req, res) {
    //Get user preferences data from client
    const { breed, age, size, gender, houseTrained } = req.body;
    console.log(req.body);
    try {
        // Get accessToken
        const accessToken = await getAccessToken();

        // Make the API request
        const apiUrl = `https://api.petfinder.com/v2/animals?type=dog&breed=${breed}&limit=100`;

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

            // Asign a score to each dog
            const dogsWithScore = dogsWithPhotos.map((dog) => {
                let score = 0;

                // Calculate score based on matching criteria and scoringSystem values
                if (dog.age.toString().toLowerCase() === age) {
                    score += 1;
                    console.log(dog.age.toString().toLowerCase());
                }
                if (dog.size.toString().toLowerCase() === size.toLowerCase()) {
                    score += 1;
                    console.log(dog.size.toString().toLowerCase());
                }
                if (dog.gender.toString().toLowerCase() === gender) {
                    score += 1;
                    console.log(dog.gender.toString().toLowerCase());
                }
                if (
                    dog.attributes.house_trained.toString().toLowerCase() ===
                    houseTrained
                ) {
                    score += 1;
                    console.log(
                        dog.attributes.house_trained.toString().toLowerCase()
                    );
                }

                // Assign the calculated score as a property to each dog object
                return { ...dog, score };
            });

            console.log("the dogs with score", dogsWithScore);

            //sort from highest to lowest score
            const sortByScore = dogsWithScore.sort((a, b) => b.score - a.score);

            //get the top 10 matches
            const bestMatches = sortByScore.slice(0, 10);

            console.log("the best matches are", bestMatches);

            return res.json(bestMatches); // Send the API response data
        } else {
            throw new Error("Unable to get dogs");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving dogs" });
    }
}

module.exports = { getBestMatches };

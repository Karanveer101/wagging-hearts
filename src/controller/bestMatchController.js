const getAccessToken = require("../services/petfinderAccessToken");

const scoringSystem = {
    experience: {
        "Experienced Owner": 3,
        "First-Time Owner": 1,
    },
    house: {
        "House with Fenced Yard": 3,
        "House with Yard": 2,
        "House with No Yard": 1,
    },
    age: {
        Puppy: 3,
        "Young Dog": 2,
        "Adult Dog": 1,
        "Senior Dog": 1,
    },
    gender: {
        Male: 2,
        Female: 2,
        "No Preference": 1,
    },
    size: {
        "Small (0-25 lbs)": 3,
        "Medium (26-60 lbs)": 2,
        "Large (61-100 lbs)": 1,
        "Extra Large (101 lbs or more)": 1,
    },
    active: {
        "Very Active": 3,
        Active: 2,
        "Laid Back": 1,
        "No Activity Preference": 1,
    },
    houseTrained: {
        Yes: 2,
        No: 1,
        "No Preference": 1,
    },
};

const calculateBestMatch = (userPreferences, dog) => {
    const { age, gender, size, active, houseTrained, breed } = userPreferences;

    const calculateScore = (dog) => {
        const ageScore = scoringSystem.age[breed.age] || 0;
        const genderScore = scoringSystem.gender[breed.gender] || 0;
        const sizeScore = scoringSystem.size[breed.size] || 0;
        const activityLevelScore =
            scoringSystem.activityLevel[breed.activityLevel] || 0;
        const houseTrainedScore =
            scoringSystem.houseTrained[breed.houseTrained] || 0;
        const breedScore = breedPreference === breed.breed ? 7 : 0;

        // Calculate total score based on user preferences
        const totalScore =
            ageScore +
            sizeScore +
            activityLevelScore +
            genderScore +
            houseTrainedScore +
            breedScore;
        console.log("the total score is", totalScore);
        return totalScore;
    };

    const matchingBreeds = dogBreeds.filter((breed) => {
        return (
            breed.size === size &&
            breed.activityLevel === active &&
            breed.friendliness === friendlinessPreference
        );
    });

    // Sort breeds by score (higher score means a better match)
    const sortedBreeds = matchingBreeds.sort(
        (a, b) => calculateScore(b) - calculateScore(a)
    );

    return sortedBreeds;
};

//get the best matches
async function getBestMatches(req, res) {
    //Get user preferences data from client
    const { experience, breed } = req.body;
    console.log(experience);
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
            const dogs = await response.json();
            console.log(dogs);
            //calculate the best matches

            return res.json(dogs); // Send the API response data
        } else {
            throw new Error("Unable to get dogs");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving dogs" });
    }
}

module.exports = { getBestMatches };

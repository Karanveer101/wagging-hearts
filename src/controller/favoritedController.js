const Favorite = require("../models/favorite");
const verifyJwtToken = require("../middleware/verifyJwtToken");

//add to favorites
async function addToFavorites(req, res) {
    //verify the token and extract user id
    const decoded = await verifyJwtToken(req);

    const userId = decoded.userId;

    //get the favorited dog data
    const favoritedData = req.body;
    console.log(favoritedData);

    //add the favorited dog to the database
    try {
        await Favorite.create({
            userId: userId,
            dogId: favoritedData.id,
            imageUrl: favoritedData.photos[0].medium,
            name: favoritedData.name,
            breedName: favoritedData.breeds.primary,
        }).then((favorited) => {
            res.status(200).json({
                message: "Favorited dog successfully added to database",
                favorited,
            });
        });
    } catch (error) {
        console.error("error adding favorited dog to the database", error);
    }
}

//get all favorites
async function getAllFavorites(req, res) {
    const decoded = await verifyJwtToken(req); //verify the jwt token
    const user = decoded.userId; //get the user id

    Favorite.find({ userId: user })
        .exec()
        .then((favorites) => {
            res.status(200).json({
                message: "sent all favorited dogs by the user",
                favorites,
            });
        })
        .catch((error) => {
            console.error("Error fetching favorited dogs by the user:", error);
        });
}

//remove from favorites
async function removeFromFavorites(req, res) {
    //verify the token and extract user id
    await verifyJwtToken(req);

    //get the dog to remove
    const data = req.body;
    const dogId = JSON.parse(data.dogId);
    console.log(dogId);

    //remove the favorited dog from the database
    try {
        const deletedDog = await Favorite.deleteOne({ dogId: dogId });
        res.status(200).json({
            message: "Successfully removed favorited dog from the database",
            deletedDog,
        });
    } catch (error) {
        console.error("error deleting favorited dog from the database", error);
    }
}

module.exports = { addToFavorites, getAllFavorites, removeFromFavorites };

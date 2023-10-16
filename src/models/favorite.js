const Mongoose = require("mongoose");

const FavoriteSchema = new Mongoose.Schema({
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    dogId: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    breedName: {
        type: String,
        required: true
    },
    dateFavorited: {
        type: Date,
        default: Date.now,
    },
});

const Favorite = Mongoose.model("favorite", FavoriteSchema);
module.exports = Favorite;

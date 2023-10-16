import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import { getAllFavorites } from "../../services/favoritedService";
import { useNavigate } from "react-router-dom";
import "./../../styles/Dashboard/favorite.css";
import { removeFromFavorites } from "../../services/favoritedService";
import { searchById } from "../../services/dogService";

function Favorites(props) {
    const { favoriteDogs, setFavoriteDogs } = props;
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    console.log(favorites);
    const [isLoading, setIsLoading] = useState(true);

    //get all favorites from the user
    async function fetchData() {
        const data = await getAllFavorites(navigate);
        setFavorites(data);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, []);

    async function handleFavoriteClick(dog) {
        try {
            // Remove the dog from the favoriteDogs list
            const updatedFavorites = favoriteDogs.filter(
                (id) => id != dog.dogId
            );
            // Update the favoriteDogs state
            setFavoriteDogs(updatedFavorites);
            // Remove the dog from favorites
            await removeFromFavorites(dog.dogId, navigate);
            // Refetch data to update the UI
            await fetchData();
        } catch (error) {
            console.error("Error removing dog from favorites:", error);
            // Handle errors, if necessary
        }
    }

    function renderFavorites() {
        return favorites.map((dog, index) => (
            <div
                key={index}
                className='dog'
                onClick={() => searchById(dog.dogId, navigate)}
            >
                <div
                    className='favorite'
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteClick(dog);
                    }}
                >
                    <IconContext.Provider
                        value={{
                            className: "favIcon",
                            size: 25,
                        }}
                    >
                        <AiFillHeart fill='red' />
                    </IconContext.Provider>
                </div>
                <img src={dog.imageUrl} alt='dogImage' />
                <h2>{dog.name}</h2>
                <p>{dog.breedName}</p>
            </div>
        ));
    }
    return (
        <div className='Favorites'>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h3>Your Favorites</h3>

                    {favorites.length > 0 ? (
                        <div className='dogGrid'>{renderFavorites()}</div>
                    ) : (
                        <div className='noFavoritesContainer'>
                            <AiOutlineHeart size='80' />
                            <div>
                                <h2>No Favorites yet.</h2>
                                <p>You have not favorited any dogs yet.</p>
                            </div>
                            <button
                                id='exploreDogBtn'
                                onClick={() => navigate("/")}
                            >
                                Explore Dogs
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Favorites;

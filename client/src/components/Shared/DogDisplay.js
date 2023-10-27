// DogDisplay.js
import React from "react";
import { RiHeartAddFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homeDogDisplay } from "../../services/dogService";
import { toggleFavorite } from "../../services/favoritedService";
import { useAuth } from "../../Context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

function DogDisplay(props) {
    const { favoriteDogs, setFavoriteDogs } = props;
    const { userRole } = useAuth();
    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(dogs);
    const navigate = useNavigate();

    //display dogs for home page
    useEffect(() => {
        const fetchData = async () => {
            await homeDogDisplay(setDogs);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <section className='dogDisplayContainer'>
            <h1>Adoptable Dogs</h1>
            {isLoading ? (
                <div>
                    <ClipLoader
                        size={50}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                        color='#217693'
                    />
                </div>
            ) : (
                <div className='dogGrid'>
                    {dogs.map((dog) => (
                        <div
                            key={dog.id}
                            className='dog'
                            onClick={() =>
                                navigate("/dog-profile", { state: { dog } })
                            }
                        >
                            {userRole === "admin" ? (
                                ""
                            ) : (
                                <div
                                    className='favorite'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(
                                            dog,
                                            dog.id,
                                            favoriteDogs,
                                            setFavoriteDogs,
                                            navigate
                                        );
                                    }}
                                >
                                    {favoriteDogs.includes(dog.id) ? (
                                        <IconContext.Provider
                                            value={{
                                                className:
                                                    "favoriteSuccessIcon",
                                                size: 25,
                                            }}
                                        >
                                            <AiFillHeart />
                                        </IconContext.Provider>
                                    ) : (
                                        <IconContext.Provider
                                            value={{
                                                className: "favoriteIcon",
                                                size: 25,
                                            }}
                                        >
                                            <RiHeartAddFill />
                                        </IconContext.Provider>
                                    )}
                                </div>
                            )}
                            <img src={dog.photos[0].medium} alt='dogImage' />
                            <h2>{dog.name}</h2>
                            <p>
                                {dog.breeds.primary} | {dog.gender}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default DogDisplay;

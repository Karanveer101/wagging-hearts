//fetch request to add favorited dog data to the database
export async function addToFavorites(dog, navigate) {
    //if user is not authenticated, redirect to the login page
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        navigate("/login/customer");
        return;
    } else {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_HOST}api/favorites/addToFavorites`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(dog),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(
                    "The favorited dog data is added to the database",
                    data
                );
                return data;
            } else {
                console.log("Failed to add favorited dog data to the database");
            }
        } catch (error) {
            console.error("error sending favorites data to the server", error);
        }
    }
}

export async function getAllFavorites(navigate) {
    //if user is not authenticated, redirect to the login page
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        navigate("/login/customer");
        return;
    } else {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_HOST}api/favorites/getAllFavorites`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                const favorites = await response.json();
                console.log(
                    "successfully received all favorited dogs from the server",
                    favorites
                );
                return favorites.favorites;
            }
        } catch (error) {
            console.error(
                "error receiving favorited data from the server",
                error
            );
        }
    }
}

export async function removeFromFavorites(dogId, navigate) {
    //if user is not authenticated, redirect to the login page
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        navigate("/login/customer");
        return;
    } else {
        try {
            const token = localStorage.getItem("jwtToken");
            console.log(token);
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_HOST}api/favorites/removeFromFavorites`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ dogId }),
                }
            );
            if (response.ok) {
                const removedDog = await response.json();
                console.log(
                    "successfully removed a favorited dog by the server",
                    removedDog
                );
                return removedDog;
            }
        } catch (error) {
            console.error("Error removing dog from favorites", error);
        }
    }
}

export const toggleFavorite = async (
    dog,
    dogId,
    favoriteDogs,
    setFavoriteDogs,
    navigate
) => {
    if (favoriteDogs.includes(dog.id)) {
        const removedDog = await removeFromFavorites(dogId, navigate);
        // Remove from favorites

        if (removedDog) {
            setFavoriteDogs(favoriteDogs.filter((id) => id !== dogId));
        } else {
            console.log("error removing dog from favorites");
        }
    } else {
        // Add to favorites
        const addedDog = await addToFavorites(dog, navigate);
        console.log(addedDog);
        if (addedDog) {
            setFavoriteDogs([...favoriteDogs, dogId]);
        } else {
            console.log("error adding dog to favorite");
        }
    }
};



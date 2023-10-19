//get dogs for home page display
export async function homeDogDisplay(setDogs) {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST}api/dog/homeDogDisplay`,
            {
                method: "GET",
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log("home page dog data fetched successfully", data);
            const result = data.animals.slice(0, 20);
            setDogs(result);
            return result;
        } else {
            console.log("failed to fetch dog data successfully");
        }
    } catch (error) {
        console.error("error fetching dog data for home page", error);
    }
}

//handle search submit
export const handleSearch = async (
    e,
    search,
    navigate,
    location,
    setSearchResults
) => {
    e.preventDefault();
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST}api/dog/search?breed=${search.breed}&location=${search.location}&limit=100`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            const dogsData = data.animals;
            const dogs = dogsData.filter((dogData) => {
                return dogData.photos.length > 0;
            });
            console.log("Seach Data sent successfully", dogs);
            const isOnSearchRoute = location.pathname === "/search";
            if (isOnSearchRoute) {
                setSearchResults(dogs);
                return dogs;
            } else {
                navigate("/search", { state: { dogs } });
            }
        } else {
            // Handle error
            console.error("Error sending search data to the server");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

//handle search dog by id
export const searchById = async (dogId, navigate) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST}api/dog/search-dog?id=${dogId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const dogData = await response.json();
            const dog = dogData.animal;
            navigate("/dog-profile", { state: { dog } });
            console.log("the dog data is ", dog);
            return dog;
        } else {
            // Handle error
            console.error("Error sending search data to the server");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

//handle filter search
export const handleFilter = async (e, search, size, gender, age, setSearchResults) => {
    e.preventDefault();
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST}api/dog/search?breed=${search.breed}&location=${search.location}&size=${size}&gender=${gender}&age=${age}&limit=100`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            const dogsData = data.animals;
            const dogs = dogsData.filter((dogData) => {
                return dogData.photos.length > 0;
            });
            console.log("Seach Data sent successfully", dogs);
            setSearchResults(dogs);
        } else {
            // Handle error
            console.error("Error sending search data to the server");
        }
    } catch (error) {
        console.error("Error has occured:", error);
    }
};


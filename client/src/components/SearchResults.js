import React from "react";
import SearchForm from "./Shared/SearchForm";
import Footer from "./Shared/Footer";
import Header from "./Shared/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillHeart } from "react-icons/ai";
import { RiHeartAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../services/favoritedService";
import "../styles/search.css";
import { useAuth } from "../Context/AuthContext";

function Search(props) {
    const location = useLocation();
    const { userRole } = useAuth();
    const { dogs } = location.state;

    const {
        favoriteDogs,
        setFavoriteDogs,
        isAuthenticated,
        isUserToggled,
        setIsUserToggled,
        search,
        setSearch,
    } = props;

    const [filter, setFilter] = useState({
        breed: search.breed,
        age: "",
        size: "",
        gender: "",
    });

    console.log(filter);

    //handle Filter Change
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter({ ...filter, [name]: value });
    };

    console.log("the filters are", filter);

    console.log(favoriteDogs, setFavoriteDogs);
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState(dogs);
    const [selectedDog, setSelectedDog] = useState();
    console.log(setSelectedDog);

    function handleDogClick(dog) {
        navigate("/dog-profile", { state: { dog } });
    }

    console.log(searchResults);
    return (
        <div className='Search'>
            <Header
                isAuthenticated={isAuthenticated}
                isUserToggled={isUserToggled}
                setIsUserToggled={setIsUserToggled}
            />
            <div className='searchResultsSpacer'></div>
            <SearchForm
                setSearchResults={setSearchResults}
                search={search}
                setSearch={setSearch}
            />
            {searchResults.length === 0 ? (
                <div>No Results found</div>
            ) : (
                <div className='searchResultsContainer'>
                    <h2 id='searchResultsHeader'>Adoptable Dogs</h2>
                    <div className='filterDogGridWrapper'>
                        {/* <form method='get' id='filter'>
                            <div>
                                <label htmlFor='age'>Age</label>
                                <select
                                    name='age'
                                    id='age'
                                    onChange={handleFilterChange}
                                >
                                    <option value=''>Select</option>
                                    <option value='baby'>Baby</option>
                                    <option value='young'>Young</option>
                                    <option value='adult'>Adult</option>
                                    <option value='senior'>Senior</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='gender'>Gender</label>
                                <select
                                    name='gender'
                                    id='gender'
                                    onChange={handleFilterChange}
                                >
                                    <option value=''>Select</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='size'>Size</label>

                                <select
                                    name='size'
                                    id='size'
                                    onChange={handleFilterChange}
                                >
                                    <option value=''>Select</option>
                                    <option value='small'>Small</option>
                                    <option value='medium'>Medium</option>
                                    <option value='large'>Large</option>
                                    <option value='xlarge'>Extra large</option>
                                </select>
                            </div>
                            <input type='submit' value='Apply' />
                        </form> */}
                        <div className='dogGrid'>
                            {searchResults.map((dog) => (
                                <div
                                    key={dog.id}
                                    className='dog'
                                    onClick={() => handleDogClick(dog)}
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
                                                        className:
                                                            "favoriteIcon",
                                                        size: 25,
                                                    }}
                                                >
                                                    <RiHeartAddFill />
                                                </IconContext.Provider>
                                            )}
                                        </div>
                                    )}
                                    <img
                                        src={dog.photos[0].medium}
                                        alt='dogImage'
                                    />
                                    <h2>{dog.name}</h2>
                                    <p>
                                        {dog.breeds.primary} | {dog.gender}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Search;

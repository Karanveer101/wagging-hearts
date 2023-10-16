import React from "react";
import { useEffect, useState } from "react";
import breedListData from "../../data/dogBreeds";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "../../services/dogService";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
    const { setSearchResults, search, setSearch } = props;

    const breedInputRef = useRef(null);
    const searchFormRef = useRef(null);
    const location = useLocation();
    const [breedInputClick, setBreedInputClick] = useState(false);
    console.log("breed input clic is ", breedInputClick);

    console.log(search);
    const [breedSuggestions, setBreedSuggestions] = useState([]);

    //handle search input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch({
            ...search,
            [name]: value,
        });
    };

    //handle search submit
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        const data = await handleSearch(
            e,
            search,
            navigate,
            location,
            setSearchResults
        );
        console.log("the data is", data);
        if (location.pathname === "/search") {
            setSearchResults(data);
        }
    };
    const breedList = breedListData;

    //handle breed click
    function handleBreedClick(e) {
        e.preventDefault();
        const selectedOption = e.target.textContent;
        const field = e.target.getAttribute("data-field");

        if (field) {
            setSearch((prevResults) => ({
                ...prevResults,
                [field]: selectedOption,
            }));

            console.log(breedInputRef);
            breedInputRef.current.value = selectedOption;
            setBreedInputClick(false);
        }
    }

    useEffect(() => {
        function handleWindowClick(event) {
            if (
                breedInputRef.current &&
                !breedInputRef.current.contains(event.target)
            ) {
                // Clicked outside of suggestions, hide them
                setBreedInputClick(false);
            }
        }

        breedInputRef.current.addEventListener("click", () => {
            // Clicked inside the input, show suggestions
            setBreedInputClick(true);
            searchFormRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });

        window.addEventListener("click", handleWindowClick);
    }, []);

    // set suggestions when searching by breed name
    useEffect(() => {
        const searchQuery = search.breed.toLowerCase();
        // eslint-disable-next-line array-callback-return
        const suggestions = breedList.filter((breed) => {
            return breed.toLowerCase().includes(searchQuery);
        });
        setBreedSuggestions(suggestions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search.breed]);

    return (
        <section ref={searchFormRef} className='searchContainer'>
            <form onSubmit={handleSubmit} method='get' id='searchFormContainer'>
                <div className='breedSearchContainer'>
                    <label htmlFor='breed'>Search</label>
                    <input
                        type='text'
                        id='breed'
                        name='breed'
                        placeholder='Breed name'
                        onChange={handleChange}
                        ref={breedInputRef}
                        onClick={() => setBreedInputClick(true)}
                        required
                    ></input>
                    <div
                        className={
                            breedInputClick
                                ? "breedSuggestionsDisplay active"
                                : "breedSuggestionsDisplay"
                        }
                    >
                        <h3>Breeds</h3>
                        {breedSuggestions.map((breed, index) => {
                            return (
                                <div
                                    key={index}
                                    className='breed'
                                    data-field='breed'
                                    onClick={(e) => {
                                        handleBreedClick(e);
                                    }}
                                >
                                    {breed}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='location'>
                    <label htmlFor='location'>Near</label>
                    <input
                        type='text'
                        id='location'
                        name='location'
                        placeholder='L6S 2P2'
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <button type='submit' id='searchBtn'>
                    <span className='material-symbols-outlined'>search</span>
                </button>
            </form>
            {breedInputClick ? <div className='blur-background'></div> : ""}
        </section>
    );
}

export default SearchForm;

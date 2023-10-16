import React, { useState, useRef } from "react";
import DogDisplay from "../Shared/DogDisplay";
import SearchForm from "../Shared/SearchForm";
import HeroImage from "./HeroImage";
import "../../styles/Main/main.css";
import Content from "./Content";

function Main(props) {
    const {
        isAuthenticated,
        favoriteDogs,
        setFavoriteDogs,
        search,
        setSearch,
    } = props;


    return (
        <div className='Main'>
            <HeroImage />
            <Content />
            <SearchForm search={search} setSearch={setSearch} />
            <DogDisplay
                isAuthenticated={isAuthenticated}
                favoriteDogs={favoriteDogs}
                setFavoriteDogs={setFavoriteDogs}
            />
        </div>
    );
}

export default Main;

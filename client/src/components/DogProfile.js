import React from "react";
import Header from "./Shared/Header";
import { useLocation } from "react-router-dom";
import "../styles/dogProfile.css";
import Footer from "./Shared/Footer";
import { IconContext } from "react-icons";
import { AiFillHeart, AiFillPhone } from "react-icons/ai";
import { RiHeartAddFill } from "react-icons/ri";
import { toggleFavorite } from "../services/favoritedService";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function DogProfile(props) {
    const navigate = useNavigate();
    const { isAuthenticated, userRole } = useAuth();
    const { favoriteDogs, setFavoriteDogs } = props;
    const location = useLocation();

    const { dog } = location.state;
    console.log(dog);

    function handleTakeMeHomeBtn() {
        if (isAuthenticated === false) {
            navigate("/login/customer");
        } else {
            const dogId = dog.id;
            const dogName = dog.name;
            const dogImage = dog.photos[0].small;
            navigate("/inquiry", {
                state: { dogId, dogName, dogImage },
            });
        }
    }

    return (
        <div className='DogProfile'>
            <Header />
            <div className='carouselContainer'>
                <div className='carousel'>
                    {dog.photos.map((photo, index) => {
                        return (
                            <div key={index}>
                                <img src={photo.medium} alt='dogImage' />
                                {userRole === "admin" ? (
                                    ""
                                ) : (
                                    <div
                                        className='favorite'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(
                                                dog.id,
                                                favoriteDogs,
                                                setFavoriteDogs
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
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='flexContent'>
                <div className='detailsWrapper'>
                    <div className='basicDetailsContainer'>
                        <h1>{dog.name}</h1>
                        <h2>{dog.breeds.primary}</h2>
                    </div>
                    <div className='detailsContainer'>
                        <div>
                            <h3>Age</h3>
                            <p>{dog.age}</p>
                        </div>
                        <div>
                            <h3>Gender</h3>
                            <p>{dog.gender}</p>
                        </div>
                        <div>
                            <h3>Breed Size</h3>
                            <p>{dog.size}</p>
                        </div>
                        <div>
                            <h3>Coat Length</h3>
                            <p>{dog.coat}</p>
                        </div>
                        <div>
                            <h3>House Trained</h3>
                            <p>{dog.attributes.house_trained ? "Yes" : "No"}</p>
                        </div>
                        <div>
                            <h3>Location</h3>
                            <p>
                                {dog.contact.address.city},
                                {dog.contact.address.state},
                                {dog.contact.address.country}
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className='aboutContainer'>
                        <h1>Meet {dog.name}</h1>
                        <p>{dog.description}</p>
                    </div>
                </div>
                <aside className='asideContentWrapper'>
                    <div className='inquiryContainer'>
                        <p>Are You Interested In Adopting {dog.name}?</p>
                        <img src={dog.photos[0].medium} alt='dogImage'></img>
                        <button
                            id='takeBtn'
                            onClick={() => handleTakeMeHomeBtn()}
                        >
                            Take Me Home
                        </button>
                    </div>
                    <div className='contactCardContainer'>
                        <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${dog.contact.address.postcode}&zoom=14&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&size=400x400&key=${process.env.REACT_APP_STATIC_MAP_API}`}
                            alt='map'
                            id='map'
                        />
                        <div className='address'>
                            <span>
                                <IoLocationSharp size={30} fill=' #217693' />
                            </span>
                            <div>
                                <h4>Location Address</h4>
                                <div>
                                    {dog.contact.address.address1},
                                    {dog.contact.address.city},
                                    {dog.contact.address.state},
                                    {dog.contact.address.country}
                                </div>
                            </div>
                        </div>
                        <div className='email'>
                            <span>
                                <MdEmail size={30} fill='#217693' />
                            </span>
                            <div>
                                <h4>Email</h4>
                                <div>{dog.contact.email}</div>
                            </div>
                        </div>
                        <div className='phone'>
                            <span>
                                <AiFillPhone size={30} fill=' #217693' />
                            </span>
                            <div>
                                <h4>Phone</h4>
                                <div>{dog.contact.phone}</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            <Footer />
        </div>
    );
}

export default DogProfile;

import React, { useState } from "react";
import "../../styles/header.css";
import { useNavigate } from "react-router-dom";
import { BsPersonDown } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useAuth } from "../../Context/AuthContext";
import logo from "./../../images/logo.png";

function Header(props) {
    const { isAuthenticated, setIsAuthenticated, userRole } = useAuth();
    console.log(isAuthenticated);
    const [isUserToggled, setIsUserToggled] = useState(false);
    const [isSignupToggled, setIsSignupToggled] = useState(false);
    const [isLoginToggled, setIsLoginToggled] = useState(false);

    console.log(isAuthenticated);
    console.log("the user toggled is", isUserToggled);

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("jwtToken"); //remove jwt token from local storage
        setIsAuthenticated(false);
        navigate("/"); //navigate to the home page
    }

    return (
        <div className='Header'>
            <div className='mainNavContainer'>
                <div>
                    <a href='/'>
                        <img src={logo} alt='logo' id='logo' />
                    </a>
                </div>
                <nav className='mainNav'>
                    <ul className='navLinks'>
                        <li>
                            <a href='/' id='home'>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href='/quiz' id='quiz'>
                                Best Match Quiz
                            </a>
                        </li>
                        <li>
                            <a href='/about' id='about'>
                                About Us
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            {isAuthenticated === null ? (
                ""
            ) : isAuthenticated ? (
                <div className='userActionsContainer'>
                    {userRole === "admin" ? (
                        ""
                    ) : (
                        <a href='/adopter/favorites'>
                            <AiOutlineHeart
                                size='25'
                                className='heartIcon'
                                fill='black'
                            />
                        </a>
                    )}
                    <div
                        id='userProfileBtn'
                        onClick={() => setIsUserToggled(!isUserToggled)}
                    >
                        <BsPersonDown size='25' className='personIcon' />
                    </div>
                    {isUserToggled && userRole === "registeredUser" ? (
                        <div className='menuLinksContainer'>
                            <a href='/adopter/dashboard'>Dashboard</a>
                            <a href='/adopter/favorites'>Favorites</a>
                            <a href='/quiz'>Quiz</a>
                            <a href='/adopter/inquiries'>Inquiries</a>
                            <button id='logOutBtn' onClick={handleLogout}>
                                Log Out
                            </button>
                        </div>
                    ) : (
                        ""
                    )}{" "}
                    {isUserToggled && userRole === "admin" ? (
                        <div className='menuLinksContainer'>
                            <a href='/admin/dashboard'>Dashboard</a>
                            <a href='/admin/applications/inquiries'>
                                Applications
                            </a>
                            <button id='logOutBtn' onClick={handleLogout}>
                                Log Out
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <ul className='authLinkList'>
                    <li>
                        <button
                            id='loginBtn'
                            onClick={() => {
                                if (isSignupToggled) {
                                    setIsSignupToggled(!isSignupToggled);
                                }
                                setIsLoginToggled(!isLoginToggled);
                            }}
                        >
                            Login
                        </button>
                        {isLoginToggled ? (
                            <div className='loginLinksContainer'>
                                <a href='/login/customer'>Adopter Login</a>
                                <a href='/login/shelter'>Shelter Staff Login</a>
                            </div>
                        ) : (
                            ""
                        )}
                    </li>
                    <li>
                        <button
                            id='signupBtn'
                            onClick={() => {
                                if (isLoginToggled) {
                                    setIsLoginToggled(!isLoginToggled);
                                }
                                setIsSignupToggled(!isSignupToggled);
                            }}
                        >
                            Sign Up
                        </button>
                        {isSignupToggled ? (
                            <div className='signupLinksContainer'>
                                <a href='/signup/customer' id='signUpLink'>
                                    Adopter Sign Up
                                </a>
                                <a href='/signup/shelter' id='signUpLink'>
                                    Shelter Staff Sign Up
                                </a>
                            </div>
                        ) : (
                            ""
                        )}
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Header;

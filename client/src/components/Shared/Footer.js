import React from "react";
import "../../styles/footer.css";
import celebratingDog from "./../../images/celebrating-dog.png";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    return (
        <div className='Footer'>
            <div className='footerContainer'>
                <div className='menuWrapper'>
                    <div className='quizLinkContainer'>
                        <img
                            src={celebratingDog}
                            alt='dogImage'
                            id='celebratingDog'
                        />
                        <h3>Find your best match!</h3>
                        <button id='quizBtn' onClick={() => navigate("/quiz")}>
                            Best Match Quiz
                        </button>
                    </div>
                    <ul className='dashboardLinks'>
                        <h4>Dashboard</h4>
                        <li>
                            <a href='/login/customer'>Login</a>
                        </li>
                        <li>
                            <a href='/adopter/dashboard'>Best Match Results</a>
                        </li>
                        <li>
                            <a href='/adopter/favorites'>Favorites</a>
                        </li>
                        <li>
                            <a href='/adopter/inquiries'>Your Inquiries</a>
                        </li>
                    </ul>
                    <ul className='waggingHeartsLinks'>
                        <h4>Quick Links</h4>
                        <li>
                            <a href='/'>Home</a>
                        </li>
                        <li>
                            <a href='/quiz'>Best Match Quiz</a>
                        </li>
                        <li>
                            <a href='/about'>About Us</a>
                        </li>
                        <li>
                            <a href='/adopter/signup'>Sign Up</a>
                        </li>
                    </ul>
                    <ul className='supportLinks'>
                        <h4>Support</h4>
                        <li>
                            <a href='/about'>FAQs</a>
                        </li>
                        <li>
                            <a href='/about'>Contact Us</a>
                        </li>
                        <li>
                            <a href='/about'>Privacy Policy</a>
                        </li>
                        <li>
                            <a href='/about'>Terms & Conditions</a>
                        </li>
                    </ul>
                </div>
                <p className='copyright'>
                    © 2023 Wagging Hearts. All rights reserved
                </p>
            </div>
        </div>
    );
}

export default Footer;

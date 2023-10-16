import React from "react";
import Header from "./Shared/Header";
import { useAuth } from "../Context/AuthContext";
import "../styles/about.css";
import myPhoto from "../images/myphoto.jpeg";

function About(props) {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    return (
        <div className='About'>
            <Header
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
            <div className='aboutContentContainer'>
                <div className='content'>
                    <p>
                        Hello, fellow dog lovers! I’m Karanveer Dhammu, the
                        passionate developer behind Wagging Hearts. As an avid
                        dog enthusiast, I embarked on a journey to create a
                        platform that not only connects wonderful dogs with
                        loving homes but also fosters a sense of community and
                        responsible pet ownership.
                        <h2>My Mission Driven by Passion</h2>
                        My love for dogs and my belief in their ability to bring
                        joy and companionship to our lives inspired me to
                        develop this platform. Every wagging tail represents the
                        culmination of my dedication to creating a space where
                        dogs find homes filled with love and care. Creating
                        Connections: I understand the unique bond between humans
                        and dogs. Through this platform, my mission is to
                        facilitate meaningful connections, ensuring that both
                        the dogs and their adoptive families experience the
                        happiness of a harmonious companionship.
                        <h2>Why Choose Wagging Hearts?</h2>
                        <p>
                            <strong>My Expertise:</strong> With my technical
                            knowledge and genuine love for dogs, Wagging Hearts
                            offers a seamless, trustworthy, and delightful user
                            experience.
                        </p>
                        <p>
                            <strong>Join My Vision:</strong> By choosing Wagging
                            Hearts, you're not just adopting a dog; you're
                            becoming a part of my vision. A vision where wagging
                            tails and smiling faces become the norm.
                        </p>
                        <strong>Get Involved</strong> I invite you to be a part
                        of this incredible journey. Your support, your feedback,
                        and your love are the driving forces behind our success.
                        Together, let’s create countless tales of happiness, one
                        adoption at a time. Thank you for considering adoption
                        and for being a part of my mission.
                    </p>
                </div>
                <div>
                    <img
                        src={myPhoto}
                        id='developerImage'
                        alt='developerImage'
                    />
                </div>
            </div>
        </div>
    );
}

export default About;

import React, { useState, useEffect } from "react";
import "..//..//styles/Dashboard/dashboardNav.css";
import jwt_decode from "jwt-decode";
import { MdDashboard, MdQuiz } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { RiFilePaperFill } from "react-icons/ri";
import "./../../styles/Dashboard/dashboardNav.css";
import { useLocation } from "react-router-dom";

function DashboardNav() {
    const location = useLocation();

    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        // Check if the token exists
        if (token) {
            try {
                // Decode the token
                const decodedToken = jwt_decode(token);
                console.log(decodedToken);

                // Access the `firstName` property from the decoded token
                const firstName = decodedToken.firstName;

                // Set the user state with the decoded information
                setUser(firstName);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    return (
        <div className='DashboardNavContainer'>
            <h2>Welcome {user}!</h2>
            <nav>
                <ul className='dashboardNavLinkList'>
                    <li
                        className={
                            location.pathname === "/adopter/dashboard" ? "active" : ""
                        }
                    >
                        <a href='/adopter/dashboard' id='dashboard'>
                            <MdDashboard size='30' fill='#217693' />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li
                        className={
                            location.pathname === "/adopter/favorites" ? "active" : ""
                        }
                    >
                        <a href='/adopter/favorites' id='favorites'>
                            <AiFillHeart size='30' fill='#217693' />
                            <span>Favorites</span>
                        </a>
                    </li>
                    <li
                        className={
                            location.pathname === "/adopter/matches" ? "active" : ""
                        }
                    >
                        <a href='/adopter/matches' id='matches'>
                            <MdQuiz size='30' fill='#217693' />
                            <span>Best Matches</span>
                        </a>
                    </li>
                    <li
                        className={
                            location.pathname === "/adopter/inquiries" ? "active" : ""
                        }
                    >
                        <a href='/adopter/inquiries' id='matches'>
                            <RiFilePaperFill size='30' fill='#217693' />
                            <span>Your Inquiries</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default DashboardNav;

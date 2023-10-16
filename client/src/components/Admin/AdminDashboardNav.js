import React, { useState, useEffect } from "react";
import "..//..//styles/Dashboard/dashboardNav.css";
import jwt_decode from "jwt-decode";
import { MdDashboard } from "react-icons/md";
import { RiFilePaperFill } from "react-icons/ri";
import "./../../styles/Dashboard/dashboardNav.css";
import { useLocation } from "react-router-dom";

function AdminDashboardNav() {
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
                            location.pathname === "/admin/dashboard"
                                ? "active"
                                : ""
                        }
                    >
                        <a href='/admin/dashboard' id='dashboard'>
                            <MdDashboard size='30' fill='#217693' />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li
                        className={
                            location.pathname.includes("applications")
                                ? "active"
                                : ""
                        }
                    >
                        <a href='/admin/applications/inquiries' id='matches'>
                            <RiFilePaperFill size='30' fill='#217693' />
                            <span>Applications</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminDashboardNav;

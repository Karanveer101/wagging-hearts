import React, { useEffect, useState } from "react";
import "../../styles/Dashboard/dashboard.css";
import Header from "../Shared/Header";
import DashboardNav from "../../components/Dashboard/DashboardNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { ClipLoader } from "react-spinners";

const AdopterDashboardLayout = (props) => {
    const { isAuthenticated, userRole } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    console.log(isAuthenticated, userRole, isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoading(false);
        } else if (isAuthenticated === false) {
            navigate("/login/customer");
        }
    }, [isAuthenticated, userRole]);

    return isLoading ? (
        <div>
            <ClipLoader
                size={50}
                aria-label='Loading Spinner'
                data-testid='loader'
                color='#217693'
            />
        </div>
    ) : isAuthenticated && userRole === "registeredUser" ? (
        <div className='Dashboard'>
            <Header />{" "}
            <div className='dashboardContainer'>
                <DashboardNav />
                <div className='dashboardContent'>
                    <Outlet />
                </div>
            </div>
        </div>
    ) : null;
};

export default AdopterDashboardLayout;

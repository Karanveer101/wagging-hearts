import React, { useEffect } from "react";
import "../../styles/Dashboard/dashboard.css";
import Header from "../Shared/Header";
import AdminDashboardNav from "./AdminDashboardNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const { isAuthenticated, userRole } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login/customer");
        }
    }, [isAuthenticated, userRole]);
    return isAuthenticated && userRole === "admin" ? (
        <div className='AdminDashboard'>
            <Header />
            <div className='dashboardContainer'>
                <AdminDashboardNav />
                <div className='dashboardContent'>
                    <Outlet />
                </div>
            </div>
        </div>
    ) : null;
};

export default Layout;

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import App from "./components/App";
import Quiz from "./components/Quiz";
import About from "./components/About";
import Favorites from "./components/Dashboard/Favorites";
import { useState, useEffect } from "react";
import SearchResults from "./components/SearchResults";
import DogProfile from "./components/DogProfile";
import Inquiry from "./components/Inquiry";
import Inquiries from "./components/Dashboard/Inquiries";
import CustomerSignup from "./components/Auth/Signup/CustomerSignup";
import ShelterSignup from "./components/Auth/Signup/ShelterSignup";
import CustomerLogin from "./components/Auth/Login/CustomerLogin.js";
import ShelterLogin from "./components/Auth/Login/ShelterLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminInquiries from "./components/Admin/Applications/Inquiries";
import InquiryDetails from "./components/Admin/Applications/InquiryDetail";
import Review from "./components/Admin/Applications/Review";
import Adopted from "./components/Admin/Applications/Adopted";
import Rejected from "./components/Admin/Applications/Rejected";
import Pending from "./components/Admin/Applications/Pending";
import Approved from "./components/Admin/Applications/Approved";
import { AuthProvider } from "./Context/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import AdopterDashboardLayout from "./components/Dashboard/AdopterDashboardLayout";
import Layout from "./components/Admin/layout";
import QuizResults from "./components/QuizResults";
import BestMatches from "./components/Dashboard/BestMatches";

function Root() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [favoriteDogs, setFavoriteDogs] = useState(() => {
        const favoriteDogsJSON = localStorage.getItem("favoriteDogs");

        if (favoriteDogsJSON !== null) {
            try {
                return JSON.parse(favoriteDogsJSON);
            } catch (error) {
                // Handle any JSON parsing errors here
                console.error("Error parsing JSON:", error);
            }
        } else return [];
    });

    const [search, setSearch] = useState({
        breed: "",
        location: "",
    });

    //set favorite dogs on local storage every time favoriteDogs state changes
    useEffect(() => {
        localStorage.setItem("favoriteDogs", JSON.stringify(favoriteDogs));
    }, [favoriteDogs]);

    async function verifyJwtToken() {
        const jwtToken = localStorage.getItem("jwtToken");
        console.log(jwtToken);

        if (jwtToken) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_HOST}api/auth/verifyJwtToken`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        },
                        body: JSON.stringify({ token: jwtToken }),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    const role = data.role;
                    setUserRole(role);
                    setIsAuthenticated(true);
                    console.log("JWT token was verified", data);
                    return true;
                } else {
                    const data = await response.json();
                    console.log("JWT token was not verified", data);
                    setIsAuthenticated(false);
                    return false;
                }
            } catch (error) {
                console.error("Error sending JWT token to the server", error);
            }
        } else {
            setIsAuthenticated(false);
        }
    }

    useEffect(() => {
        verifyJwtToken();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <App
                    favoriteDogs={favoriteDogs}
                    setFavoriteDogs={setFavoriteDogs}
                    search={search}
                    setSearch={setSearch}
                />
            ),
        },
        {
            path: "/adopter",
            element: <AdopterDashboardLayout />,
            children: [
                {
                    path: "dashboard",
                    element: (
                        <Dashboard
                            favoriteDogs={favoriteDogs}
                            setFavoriteDogs={setFavoriteDogs}
                        />
                    ),
                },
                {
                    path: "matches",
                    element: <BestMatches />,
                },
                {
                    path: "inquiries",
                    element: <Inquiries />,
                },
                {
                    path: "favorites",
                    element: (
                        <Favorites
                            favoriteDogs={favoriteDogs}
                            setFavoriteDogs={setFavoriteDogs}
                        />
                    ),
                },
            ],
        },
        {
            path: "/quiz",
            element: <Quiz />,
        },
        {
            path: "/quiz/results",
            element: <QuizResults />,
        },
        {
            path: "/admin",
            element: <Layout />,
            children: [
                {
                    path: "/admin/applications/inquiry/view",
                    element: <InquiryDetails />,
                },
                {
                    path: "/admin/dashboard",
                    element: <AdminDashboard />,
                },
                {
                    path: "/admin/applications/inquiries",
                    element: <AdminInquiries />,
                },
                {
                    path: "/admin/applications/review",
                    element: <Review />,
                },

                {
                    path: "/admin/applications/adopted",
                    element: <Adopted />,
                },
                {
                    path: "/admin/applications/pending",
                    element: <Pending />,
                },
                {
                    path: "/admin/applications/approved",
                    element: <Approved />,
                },
                {
                    path: "/admin/applications/rejected",
                    element: <Rejected />,
                },
            ],
        },
        {
            path: "/signup/customer",
            element: <CustomerSignup />,
        },

        {
            path: "/signup/shelter",
            element: <ShelterSignup />,
        },
        {
            path: "/inquiry",
            element: <Inquiry />,
        },
        {
            path: "/login/customer",
            element: <CustomerLogin />,
        },
        {
            path: "/login/shelter",
            element: <ShelterLogin />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/search",
            element: (
                <SearchResults
                    favoriteDogs={favoriteDogs}
                    setFavoriteDogs={setFavoriteDogs}
                    search={search}
                    setSearch={setSearch}
                />
            ),
        },
        {
            path: "/dog-profile",
            element: (
                <DogProfile
                    favoriteDogs={favoriteDogs}
                    setFavoriteDogs={setFavoriteDogs}
                />
            ),
        },
    ]);

    return (
        <React.StrictMode>
            <AuthProvider
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                userRole={userRole}
                setUserRole={setUserRole}
            >
                <RouterProvider router={router} />
            </AuthProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

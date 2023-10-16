import React from "react";
import Header from "../../Shared/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/login.css";
import dogImage from "../../../images/login.jpg";
import { handleSubmit } from "../../../services/authService";
import { useAuth } from "../../../Context/AuthContext";

function ShelterLogin(props) {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserRole } = useAuth();
    const [error, setError] = useState();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const submitLogin = async (e) => {
        const response = await handleSubmit(
            e,
            loginData,
            setIsAuthenticated,
            navigate,
            setUserRole
        );
        if (response) {
            setError(response.message);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    return (
        <div className='ShelterLogin'>
            <Header />
            <div className='signinWrapper'>
                <div className='signinContainer'>
                    <h1>Sign In!</h1>
                    <p>Sign in with your existing account</p>
                    <form
                        method='post'
                        id='signinForm'
                        onSubmit={(e) => submitLogin(e)}
                    >
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email'
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            onChange={handleChange}
                            required
                        />
                        <button type='submit' id='signinBtn'>
                            Sign In
                        </button>
                    </form>
                    {error ? <p style={{color: 'red'}}>{error}</p> : ""}
                    <p>Don't have an account?</p>
                    <a href='/signup'>Sign up</a>
                </div>
                <div className='imageContainer'>
                    {/* Photo by <a href="https://unsplash.com/@mtsjrdl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mathis Jrdl</a> on <a href="https://unsplash.com/photos/5yAhL8ViUVg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
                    <img src={dogImage} alt='dogImage' id='loginDogImage' />
                </div>
            </div>
        </div>
    );
}

export default ShelterLogin;

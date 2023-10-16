import React from "react";
import { useState, useEffect } from "react";
import "../../../styles/signUp.css";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/Header";
import dogImage from "../../../images/signup.jpg";
import { sendUserData } from "../../../services/authService";
import { validateForm } from "./validation";

function ShelterSignup() {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
    });

    const [errors, setErrors] = useState({});
    const [initialRender, setInitialRender] = useState(true);

    const [valid, setValid] = useState(false);
    console.log(valid);
    console.log(errors);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value,
        });
    };

    //send user data when valid state changes
    useEffect(() => {
        //do not send user data on first render
        if (!initialRender) {
            sendUserData(valid, signUpData, navigate);
        } else {
            setInitialRender(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid]); // Include valid as a dependency

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateForm(signUpData, setErrors, setValid); //valid state changes to true if form passes validation
    };

    return (
        <div className='signUp'>
            <Header />
            <div className='signUpWrapper'>
                <div className='signUpContainer'>
                    <h1>Welcome to Wagging Hearts!</h1>
                    <h2>Create a new account</h2>
                    <form
                        action='http://localhost:5000/users/signup/submit'
                        method='post'
                        onSubmit={handleSubmit}
                        id='signUpForm'
                    >
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            placeholder='First Name'
                            onChange={handleChange}
                            required
                        />
                        <p className='error'>{errors.firstName}</p>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            placeholder='Last Name'
                            onChange={handleChange}
                            required
                        />
                        <p className='error'>{errors.lastName}</p>

                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='email'
                            onChange={handleChange}
                            required
                        />
                        <p className='error'>{errors.email}</p>

                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                            required
                        />
                        <p className='error'>{errors.password}</p>

                        <input
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            onChange={handleChange}
                            required
                        />
                        <p className='error'>{errors.confirmPassword}</p>
                        <button type='submit' id='signUpBtn'>
                            Create account
                        </button>
                    </form>
                    <p>Already have an account ?</p>
                    <a href='/login'>Sign In</a>
                </div>
                <div className='imageContainer'>
                    <img src={dogImage} alt='dogImage' id='signupDogImage' />
                </div>
            </div>
        </div>
    );
}

export default ShelterSignup;

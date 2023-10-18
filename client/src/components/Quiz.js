import React from "react";
import "../styles/quiz.css";
import { useRef } from "react";
import { useState } from "react";
import Header from "./Shared/Header";
import celebratingDog from "./../images/celebrating-dog.png";
import breedList from "./../data/dogBreeds";
import { getBestMatches } from "../services/bestMatchService";
import { useNavigate } from "react-router-dom";

function Quiz(props) {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = props;
    const quizStartRef = useRef(null);
    const quizInterfaceRef = useRef(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    function hideStartQuiz() {
        if (quizStartRef.current) {
            quizStartRef.current.style.display = "none";
            quizInterfaceRef.current.style.display = "flex";
        }
    }
    const [userPreferences, setUserPreferences] = useState({
        age: "",
        gender: "",
        size: "",
        houseTrained: "",
        breed: "",
    });

    const [isOptionSelected, setIsOptionSelected] = useState(false);

    function handleClick(e) {
        e.preventDefault();
        const selectedOption = e.target.dataset.propertyName;
        const field = e.target.getAttribute("data-field");

        if (field) {
            setUserPreferences((prevResults) => ({
                ...prevResults,
                [field]: selectedOption,
            }));
            setIsOptionSelected(true);
        }
    }

    //breed list turned into array of breed objects
    const breedObjects = breedList.map((breedName) => {
        return { [breedName]: breedName };
    });

    //quiz questions
    const questions = [
        {
            question: "1.) What is your ideal preference?",
            field: "age",
            options: [
                {
                    baby: "A puppy",
                },
                {
                    young: "A young dog",
                },
                {
                    adult: "A adult dog",
                },
                {
                    senior: "A senior dog",
                },
            ],
        },
        {
            question: "2.) I would like to adopt a",
            field: "gender",
            options: [
                {
                    male: "Male",
                },
                {
                    female: "Female",
                },
            ],
        },

        {
            question: "3.) How big do you want your fully grown dog to be?",
            field: "size",
            options: [
                {
                    small: "small (0-25 lbs)",
                },
                {
                    medium: "medium (26-60 lbs)",
                },
                {
                    large: "large (61-100 lbs)",
                },
                {
                    extraLarge: "extra large (101 lbs or more)",
                },
            ],
        },
        {
            question: "4.) I want my dog to be house trained",
            field: "houseTrained",
            options: [
                {
                    true: "Yes",
                },
                {
                    false: "No",
                },
            ],
        },
        {
            question: "5.) A breed I really like is",
            field: "breed",
            options: breedObjects,
        },
    ];

    //handle next button
    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        const selectedOptions = Object.values(userPreferences);
        console.log(selectedOptions[currentQuestion + 1]);
        if (selectedOptions[currentQuestion + 1] === "") {
            setIsOptionSelected(false);
        } else setIsOptionSelected(true);
    };

    //handle previous button
    const handlePreviousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
        setIsOptionSelected(true);
    };

    //progress bar
    const totalQuestions = questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    //handle quiz results
    async function handleQuizResults() {
        const bestMatches = await getBestMatches(userPreferences);
        navigate("/quiz/results", { state: { bestMatches } });
    }

    return (
        <div className='Quiz'>
            <Header
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
            <div className='quizContainer' onClick={handleClick}>
                <div ref={quizStartRef} className='startQuizContainer'>
                    <div>
                        <img src={celebratingDog} alt='dogImage' />
                        <h2>Best Match Quiz</h2>
                        <p>Find out which breed is right for you</p>
                        <button onClick={hideStartQuiz} id='startQuizBtn'>
                            Start Quiz
                        </button>
                    </div>
                </div>

                <div ref={quizInterfaceRef} className='quizInterfaceContainer'>
                    <div className='progressBarContainer'>
                        <p>Quiz Progress</p>
                        <div className='progress-bar-container'>
                            <div
                                className='progress-bar'
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className='quizQuestionContainer'>
                        <h2>{questions[currentQuestion].question}</h2>
                        <ul className='options'>
                            {questions[currentQuestion].options.map(
                                (option, index) => {
                                    const key = Object.keys(option)[0]; // Get the key of the option object
                                    const value = option[key]; // Get the value associated with the key

                                    return (
                                        <li
                                            key={index}
                                            data-field={
                                                questions[currentQuestion].field
                                            }
                                            data-property-name={key}
                                            className={
                                                Object.values(
                                                    userPreferences
                                                ).includes(key)
                                                    ? "selected"
                                                    : ""
                                            }
                                        >
                                            {value}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                    <div className='quizNavBtns'>
                        {currentQuestion > 0 ? (
                            <button
                                id='backBtn'
                                onClick={handlePreviousQuestion}
                            >
                                Back
                            </button>
                        ) : (
                            ""
                        )}
                        {currentQuestion < questions.length - 1 && (
                            <button
                                id='nextBtn'
                                onClick={handleNextQuestion}
                                disabled={!isOptionSelected}
                            >
                                Next
                            </button>
                        )}

                        {currentQuestion === 4 &&
                            Object.values(userPreferences)[currentQuestion] !==
                                "" && (
                                <button
                                    id='viewResultsBtn'
                                    onClick={() => handleQuizResults()}
                                >
                                    View Results
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;

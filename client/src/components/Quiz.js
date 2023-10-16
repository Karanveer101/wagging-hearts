import React from "react";
import "../styles/quiz.css";
import { useRef } from "react";
import { useState } from "react";
import Header from "./Shared/Header";
import celebratingDog from "./../images/celebrating-dog.png";
import breedList from "./../data/dogBreeds";
import { getBestMatches } from "../services/bestMatchService";

function Quiz(props) {
    const { isAuthenticated, setIsAuthenticated } = props;
    const quizStartRef = useRef(null);
    const quizInterfaceRef = useRef(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [bestMatch, setBestMatch] = useState([]);

    function hideStartQuiz() {
        if (quizStartRef.current) {
            quizStartRef.current.style.display = "none";
            quizInterfaceRef.current.style.display = "flex";
        }
    }
    const [userPreferences, setUserPreferences] = useState({
        experience: "",
        house: "",
        age: "",
        gender: "",
        size: "",
        active: "",
        houseTrained: "",
        breed: "",
    });

    const [isOptionSelected, setIsOptionSelected] = useState(false);

    function handleClick(e) {
        e.preventDefault();
        const selectedOption = e.target.textContent;
        const field = e.target.getAttribute("data-field");

        if (field) {
            setUserPreferences((prevResults) => ({
                ...prevResults,
                [field]: selectedOption,
            }));
            setIsOptionSelected(true);
        }
    }

    //quiz questions
    const questions = [
        {
            question: "1.) Have you owned or raised a dog before?",
            field: "experience",
            options: [
                "Yes, I'm an experienced dog owner",
                "No, this will be my first time",
            ],
        },
        {
            question: "2.) Where will your dog live?",
            field: "house",
            options: [
                "A house with a fenced yard",
                "A house with a yard",
                "A house with no yard",
            ],
        },
        {
            question: "3.) What is your ideal preference?",
            field: "age",
            options: [
                "No age preference",
                "A puppy",
                "A young dog",
                "A adult dog",
                "A senior dog",
            ],
        },
        {
            question: "4.) I would like to adopt a",
            field: "gender",
            options: ["No preference", "Male", "Female"],
        },

        {
            question: "5.) How big do you want your fully grown dog to be?",
            field: "size",
            options: [
                "small (0-25 lbs)",
                "medium (26-60 lbs)",
                "large (61-100 lbs)",
                "extra large (101 lbs or more)",
            ],
        },
        {
            question: "6.) What is your dog's prefered activity level",
            field: "activity",
            options: [
                "no activity preference",
                "very active",
                "active",
                "laid back",
                "lap pet",
            ],
        },
        {
            question: "7.) I want my dog to be house trained",
            field: "houseTrained",
            options: ["No preference", "Yes", "No"],
        },
        {
            question: "8.) A breed I really like is",
            field: "breed",
            options: breedList,
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
                                (option, index) => (
                                    <li
                                        key={index}
                                        data-field={
                                            questions[currentQuestion].field
                                        }
                                        className={
                                            Object.values(
                                                userPreferences
                                            ).includes(option)
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        {option}
                                    </li>
                                )
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

                        {currentQuestion === 7 &&
                            Object.values(userPreferences)[currentQuestion] !==
                                "" && (
                                <button
                                    id='viewResultsBtn'
                                    onClick={() =>
                                        getBestMatches(userPreferences)
                                    }
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

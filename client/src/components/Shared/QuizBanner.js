import React from "react";
import celebratingDog from "../../images/celebrating-dog.png";
import "../../styles/quizBanner.css";
import { useNavigate } from "react-router-dom";

function QuizBanner() {
    const navigate = useNavigate();
    return (
        <div className='QuizBanner'>
            <img src={celebratingDog} alt='dog' />
            <div>
                <h2>Let our dog wizard help you!</h2>
                <p>Discover your perfect canine companion with a quiz!</p>
            </div>
            <button onClick={() => navigate("/quiz")}>Start Quiz</button>
        </div>
    );
}

export default QuizBanner;

import React from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function QuizSection() {
    const navigate = useNavigate();
    return (
        <div className='QuizSection'>
            <h3>Best Match Quiz</h3>
            <div className='noMatchesContainer'>
                <MdOutlineQuiz size='80' />
                <div>
                    <h2>No results yet.</h2>
                    <p>Find your perfect dog with our quiz!</p>
                </div>

                <button id='takeQuizBtn' onClick={() => navigate("/quiz")}>
                    Take Quiz
                </button>
            </div>
        </div>
    );
}

export default QuizSection;

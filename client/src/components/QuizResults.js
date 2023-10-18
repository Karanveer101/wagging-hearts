import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Shared/Header";

function QuizResults() {
    const navigate = useNavigate();
    const location = useLocation();

    const { bestMatches } = location.state;
    console.log(bestMatches);
    //handle dog click
    function handleDogClick(dog) {
        navigate("/dog-profile", { state: { dog } });
    }
    return (
        <div className='QuizResults'>
            <Header />
            {bestMatches.length > 0 ? (
                <div className='resultsContainer'>
                    <h2 className='resultsHeader'>
                        Here are your top matches!
                    </h2>
                    <div className='dogGrid'>
                        {bestMatches.map((dog) => (
                            <div
                                key={dog.id}
                                className='dog'
                                onClick={() => handleDogClick(dog)}
                            >
                                <img
                                    src={dog.photos[0].medium}
                                    alt='dogImage'
                                />
                                <h2>{dog.name}</h2>
                                <p>
                                    {dog.breeds.primary} | {dog.gender}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='resultsContainer'>
                    <h2 className='resultsHeader'>
                        Sorry no matches were found!
                    </h2>
                </div>
            )}
        </div>
    );
}

export default QuizResults;

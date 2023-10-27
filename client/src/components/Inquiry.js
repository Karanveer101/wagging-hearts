import React, { useState, useEffect } from "react";
import "./../styles/inquiry.css";
import Header from "./Shared/Header";
import { RiFilePaperFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { sendInquiry } from "../services/inquiryService";
import { getUserData } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { BsSendCheckFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

function Inquiry(props) {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = props;
    const [consentChecked, setConsentChecked] = useState(false);
    const [sentStatus, setSentStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { dogId, dogName, dogImage } = location.state;
    const [contactDetails, setContactDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [inquiryData, setInquiryData] = useState({
        dogId: dogId,
        dogName: dogName,
        dogImage: dogImage,
        status: "Pending",
        sender: "",
        message: "",
    });

    console.log(inquiryData);

    //update message textbox
    function updateMessage(e) {
        setInquiryData((prevState) => ({
            ...prevState,
            message: e.target.value,
        }));
    }

    //get user contact information data
    useEffect(() => {
        (async () => {
            try {
                const data = await getUserData(isAuthenticated, navigate);
                setContactDetails(data);
                setInquiryData((prev) => ({
                    ...prev,
                    sender: data[0].firstName,
                }));
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    //character count for message
    const [text, setText] = useState("");

    const handleTextChange = (event) => {
        const inputValue = event.target.value;
        setText(inputValue);
    };

    const characterCount = text.length;
    return (
        <div className='Inquiry'>
            <Header
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
            <div className='InquiryContainer'>
                {isLoading ? (
                    <div>
                        {" "}
                        <ClipLoader
                            size={50}
                            aria-label='Loading Spinner'
                            data-testid='loader'
                            color='#217693'
                        />
                    </div>
                ) : (
                    <div className='InquiryWrapper'>
                        {!sentStatus && contactDetails.length > 0 ? (
                            <div>
                                <RiFilePaperFill
                                    size={80}
                                    className='paperIcon'
                                />
                                <div className='inquiryHeader'>
                                    <h2> Submit Your Inquiry</h2>
                                    <p>
                                        Review your information which will be
                                        sent to the shelter
                                    </p>
                                </div>
                                <div className='contactInfoContainer'>
                                    <h2>Your Contact Information</h2>
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>
                                            First Name:{" "}
                                        </span>
                                        {contactDetails[0].firstName}
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>
                                            Last Name:{" "}
                                        </span>
                                        {contactDetails[0].lastName}
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>
                                            Email:{" "}
                                        </span>
                                        {contactDetails[0].email}
                                    </p>
                                </div>
                                <div className='personalizeContainer'>
                                    <h2>
                                        Personalize Your Inquiry
                                        {/* <span id='optional'> (optional)</span> */}
                                    </h2>
                                    <p>
                                        In a few words, explain to the shelter
                                        why you believe you would be a suitable
                                        match for Nova (20230121-03). Please
                                        refrain from including email addresses
                                        or website links in this response. Your
                                        account's email address will be shared
                                        as part of your introduction.
                                    </p>
                                    <textarea
                                        id='personalizeTextarea'
                                        placeholder='I would be a good fit for Nove because...'
                                        onChange={(e) => {
                                            updateMessage(e);
                                            handleTextChange(e);
                                        }}
                                        maxLength='100'
                                    ></textarea>
                                    <p className='InquiryCharacterCount'>
                                        {characterCount}/100
                                    </p>
                                </div>

                                <div className='acknowledgement'>
                                    <h3>
                                        Please acknowledge the following in
                                        order to continue:
                                    </h3>
                                    {errorMessage && (
                                        <div style={{ color: "red" }}>
                                            {errorMessage}
                                        </div>
                                    )}
                                    <div>
                                        <input
                                            id='consent'
                                            type='checkbox'
                                            checked={consentChecked}
                                            onChange={() => {
                                                setErrorMessage("");
                                                setConsentChecked(
                                                    !consentChecked
                                                );
                                            }}
                                        />
                                        <label htmlFor='consent'>
                                            I acknowledge that this form serves
                                            solely as an inquiry and does not
                                            constitute an adoption application.{" "}
                                            <br />
                                            I'm aware that the information I
                                            provide will be shared with both
                                            Wagging Hearts and the shelter, and
                                            I understand that Wagging Hearts
                                            bears no responsibility for any
                                            interactions with the shelter.
                                        </label>
                                    </div>
                                </div>

                                <button
                                    id='inquiryBtn'
                                    onClick={() => {
                                        if (!consentChecked) {
                                            setErrorMessage(
                                                "You must acknowledge the consent before sending the inquiry."
                                            );
                                            return;
                                        }
                                        sendInquiry(inquiryData, setSentStatus);
                                    }}
                                >
                                    Send Your Inquiry
                                </button>
                            </div>
                        ) : (
                            <div className='inquirySuccessMessage'>
                                <span id='sentCheckIcon'>
                                    <BsSendCheckFill fill='#217693' size='70' />
                                </span>
                                <h1>Inquiry Sent!</h1>
                                <p>
                                    You have successfully submitted an inquiry
                                    for review.
                                </p>
                                <div className='inquiryNavBtns'>
                                    <button
                                        id='homeBtn'
                                        onClick={() => navigate("/")}
                                    >
                                        Home
                                    </button>
                                    <button
                                        id='dashboardBtn'
                                        onClick={() =>
                                            navigate("/adopter/dashboard")
                                        }
                                    >
                                        Dashboard
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Inquiry;

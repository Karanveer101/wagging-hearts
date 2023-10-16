import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/Admin/inquiryDetails.css";

const InquiryDetails = () => {
    const location = useLocation();
    const {
        firstName,
        lastName,
        dateReceived,
        email,
        dogName,
        dogImage,
        inquiryId,
        status,
        conversation,
    } = location.state;
    console.log(conversation);

    const [inquiryData, setInquiryData] = useState({
        message: "",
        inquiryId: inquiryId,
        status: status,
    });

    console.log(inquiryData);

    const statusColors = {
        Pending: "#f39c12",
        "In Review": "#3498db",
        Approved: "#27ae60",
        Rejected: "#e74c3c",
        Adopted: "#8e44ad",
    };

    const handleSubmitResponse = (e) => {
        e.preventDefault();
        // Logic to handle form submission with selectedStatus and data text
        // ...
    };

    //character count for message
    const [text, setText] = useState("");

    const handleTextChange = (event) => {
        const inputValue = event.target.value;
        setText(inputValue);
    };
    const characterCount = text.length;

    return (
        <div>
            <div className='inquiry-details'>
                <h2>Inquiry</h2>
                <div>
                    <div className='inquiryDetailsHeader'>
                        <div>
                            <h3>From:</h3>
                            <div className='adopterInfo'>
                                <span className='adopterLabel'>Name:</span>{" "}
                                {firstName} {lastName}
                            </div>
                            <div className='adopterInfo'>
                                <span className='adopterLabel'>Email:</span>{" "}
                                {email}
                            </div>
                            <div className='adopterInfo'>
                                <span className='adopterLabel'>Date Sent:</span>{" "}
                                {dateReceived}
                            </div>
                        </div>
                        <div>
                            <h3>Interested in:</h3>
                            <div className='dog'>
                                <img src={dogImage} alt='dogImage' />
                                <h1>{dogName}</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Messages:</h3>
                        <div className='messageBox'>
                            <ul>
                                {conversation.map((data, index) => (
                                    <li key={index}>
                                        <strong className={data.sender === "Admin" ? "receiver-message" : "sender-message"}>
                                       
                                            {data.sender === "Admin" ? (
                                                <div>You: {data.message}</div>
                                            ) : (
                                                <div>
                                                    {data.sender}:{" "}
                                                    {data.message}
                                                </div>
                                            )}
                                        </strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <form onSubmit={handleSubmitResponse}>
                        <label htmlFor='status'>Select Status</label>
                        <select
                            name='status'
                            id='status'
                            value={inquiryData.status}
                            required
                            style={{
                                backgroundColor:
                                    statusColors[inquiryData.status],
                            }}
                            onChange={(e) => {
                                setInquiryData((previous) => ({
                                    ...previous,
                                    status: e.target.value,
                                }));
                            }}
                        >
                            <option value='Pending'>Pending</option>
                            <option value='In Review'>In Review</option>
                            <option value='Approved'>Approved</option>
                            <option value='Rejected'>Rejected</option>
                            <option value='Adopted'>Adopted</option>
                        </select>
                        <div>
                            <label htmlFor='responseText'>Response Text:</label>
                            <textarea
                                id='responseText'
                                name='responseText'
                                onChange={(e) => {
                                    handleTextChange(e);
                                    setInquiryData((previous) => ({
                                        ...previous,
                                        message: e.target.value,
                                    }));
                                }}
                                maxLength='100'
                            />
                            <p className='InquiryCharacterCount'>
                                {characterCount}/100
                            </p>
                        </div>
                        <button type='submit' id='sendResponseBtn'>
                            Send Response
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InquiryDetails;

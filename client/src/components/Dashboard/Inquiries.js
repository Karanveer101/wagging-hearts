import React, { useState, useEffect } from "react";
import { RiFilePaper2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { fetchInquiriesSent } from "../../services/inquiryService";
import statusColors from "../Admin/Applications/Status/statusColors";
import { MdDeleteForever } from "react-icons/md";
import { deleteInquiry } from "../../services/inquiryService";

function Inquiries() {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        (async () => {
            await fetchInquiriesSent(setInquiries);
            setIsLoading(false);
        })();
    }, [deleted]);

    async function handleDelete(inquiryId) {
        const deletedInquiry = await deleteInquiry(inquiryId);
        console.log(deletedInquiry);
        if (deletedInquiry) {
            setDeleted(!deleted);
        } else {
            console.log("error deleting inquiry");
        }
    }
    return (
        <div className='Applications'>
            <div>
                <h3>Your Inquiries</h3>
                {isLoading ? (
                    <div>Loading...</div>
                ) : inquiries.length > 0 ? (
                    <div className='inquiries'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date Sent</th>
                                    <th>Dog Name</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map((inquiry, index) => (
                                    <tr key={index}>
                                        <td>{inquiry.createdAt}</td>
                                        <td>
                                            <h4>{inquiry.dogName}</h4>
                                        </td>
                                        <td>
                                            <div>
                                                <img
                                                    src={inquiry.dogImage}
                                                    alt='dogImage'
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className='status'
                                                style={{
                                                    backgroundColor:
                                                        statusColors[
                                                            inquiry.status
                                                        ],
                                                }}
                                            >
                                                {inquiry.status}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='inquiryBtnsContainer'>
                                                <button
                                                    id='viewBtn'
                                                    onClick={() =>
                                                        navigate(
                                                            "/adopter/inquiry/view"
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>
                                                <span
                                                    onClick={() =>
                                                        handleDelete(
                                                            inquiry._id
                                                        )
                                                    }
                                                >
                                                    <MdDeleteForever
                                                        className='deleteInqIcon'
                                                        size='35'
                                                        fill='#ff1e56c3'
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='inquiriesContainer'>
                        <RiFilePaper2Line size='80' />
                        <div>
                            <h2>No Inquiries Yet.</h2>
                            <p>You have not submitted any inquiries yet.</p>
                        </div>
                        <button
                            id='exploreDogBtn'
                            onClick={() => navigate("/")}
                        >
                            Explore Dogs
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Inquiries;

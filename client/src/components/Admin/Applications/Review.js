import React, { useEffect, useState } from "react";
import ApplicationNav from "./ApplicationNav";
import { fetchInquiries } from "../../../services/admin/applicationsService";
import statusColors from "./Status/statusColors";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import renderTable from "./Functions/renderTable";
import { RiFilePaper2Line } from "react-icons/ri";
function Review() {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //fetch inquiries with pending status
    useEffect(() => {
        fetchInquiries()
            .then((data) => {
                const reviewInquiries = data.filter(
                    (inquiry) => inquiry.status === "In Review"
                );
                setInquiries(reviewInquiries);
                setIsLoading(false);
            })
            .catch((error) =>
                console.error("Error fetching inquiry data:", error)
            );
    }, []);

    return (
        <div>
            <ApplicationNav />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className='RequestsContainer'>
                    {inquiries.length > 0 ? (
                        renderTable(
                            inquiries,
                            navigate,
                            statusColors,
                            MdDeleteForever
                        )
                    ) : (
                        <div className='inquiriesContainer'>
                            <RiFilePaper2Line size='80' />
                            <div>
                                <h2>No application to review.</h2>
                                <p>
                                    You do not have any applications to review
                                    yet.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Review;

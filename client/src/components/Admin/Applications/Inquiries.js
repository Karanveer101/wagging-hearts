import React, { useState, useEffect } from "react";
import ApplicationNav from "./ApplicationNav";
import { RiFilePaper2Line } from "react-icons/ri";
import { fetchInquiries } from "../../../services/admin/applicationsService";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import statusColors from "./Status/statusColors";
import renderTable from "./Functions/renderTable";

function Requests() {
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInquiries()
            .then((data) => {
                setInquiries(data);
                setIsLoading(false);
            }) // Set the fetched data to the component state
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
                                <h2>No Inquiries Received.</h2>
                                <p>You have not received any inquiries yet.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Requests;

import React, { useEffect, useState } from "react";
import ApplicationNav from "./ApplicationNav";
import { fetchInquiries } from "../../../services/admin/applicationsService";
import statusColors from "./Status/statusColors";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import renderTable from "./Functions/renderTable";
import { RiFilePaper2Line } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
function Adopted() {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //fetch inquiries with pending status
    useEffect(() => {
        fetchInquiries()
            .then((data) => {
                const Adopted = data.filter(
                    (inquiry) => inquiry.status === "Adopted"
                );
                setInquiries(Adopted);
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
                <div>
                    <ClipLoader
                        size={50}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                        color='#217693'
                    />
                </div>
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
                                <h2>No applications completed.</h2>
                                <p>
                                    You do not have any adoption applications
                                    completed yet.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Adopted;

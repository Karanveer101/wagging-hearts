
export const fetchInquiries = async () => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST}api/applications/inquiries`,
            {
                method: "GET",
            }
        );

        if (response.ok) {
            const inquiries = await response.json();

            console.log("sucessfully fetched pending inquiries");
            return inquiries;
        } else {
            console.error("unsuccessful attempt at fetching pending inquiries");
        }
    } catch (error) {
        console.error("Error fetching pending inquiries", error);
    }
};

export const updateInquiryStatus = async (inquiryId, newValue) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST}api/applications/updateInquiryStatus`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inquiryId, newValue }),
            }
        );

        if (response.ok) {
            console.log("Successfully updated inquiry status in the database");
        } else {
            console.error(
                "Unsuccessful attempt at updating inquiry status in the database"
            );
        }
    } catch (error) {
        console.error("Error updating inquiry status in the database", error);
    }
};


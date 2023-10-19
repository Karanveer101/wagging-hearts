// Function to send sign-up data to the server
export async function sendInquiry(inquiryData, setSentStatus) {
    const token = localStorage.getItem("jwtToken");
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}api/inquiry/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(inquiryData), // Convert the data to a JSON formatted string
        });

        if (response.ok) {
            // Handle a successful response from the server
            console.log("Inquiry sent successfully");
            setSentStatus(true);
        } else {
            // Handle other server errors
            console.error("unsuccessful attempt at sending inquiry");
        }
    } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error sending inquiry:", error);
    }
}

// Function to get all inquiries sent by the user
export async function fetchInquiriesSent(setInquiries) {
    const token = localStorage.getItem("jwtToken");
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST}api/inquiry/fetchInquiriesSent`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            // Handle a successful response from the server
            const data = await response.json();
            setInquiries(data);
            console.log("Inquiries fetched successfully", data);
            return data;
        } else {
            // Handle other server errors
            console.error(
                "unsuccessful attempt at fetching inquiries by the registered user"
            );
        }
    } catch (error) {
        // Handle network errors or other exceptions
        console.error(
            "Error fetching inquiries by the registered user:",
            error
        );
    }
}


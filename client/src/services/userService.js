//fetch request to get user contact details
async function getUserData(isAuthenticated, navigate) {
    //if user is not authenticated, redirect to the login page
    if (isAuthenticated === false) {
        navigate("/login/customer");
        return;
    } else {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_HOST}api/users/getUserData`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                const contactDetails = data.user;
                console.log(
                    "The user data is fetched successfully",
                    contactDetails
                );
                return contactDetails;
            } else {
                console.log("Failed to fetch user data");
            }
        } catch (error) {
            console.error("error fetching user data", error);
        }
    }
}

module.exports = { getUserData };

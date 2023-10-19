// Function to send sign-up data to the server
export async function sendUserData(valid, signUpData, navigate) {
    if (valid) {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_HOST}api/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signUpData), // Convert the data to a JSON formatted string
                }
            );

            if (response.ok) {
                // Handle a successful response from the server
                console.log("Data sent successfully");
                navigate("/adopter/dashboard"); //navigate to dashboard upon successful sign up
            } else if (response.status === 400) {
                // Handle validation errors if the server responds with a 400 status code
                const errorData = await response.json();
                console.log("Validation errors:", errorData);
            } else {
                // Handle other server errors
                console.error("Error sending data to the server");
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error("Error:", error);
        }
    } else {
        // Handle the case where 'valid' is false
        console.error("Invalid data. Cannot send to the server.");
    }
}

//send form data to server for login
export const handleSubmit = async (
    e,
    loginData,
    setIsAuthenticated,
    navigate,
    setUserRole
) => {
    e.preventDefault();
    localStorage.removeItem("jwtToken");

    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData), // Convert the data to JSON format
        });

        console.log(response);

        if (response.ok) {
            //set isAuthenticated to true

            // Handle a successful response from the server
            const data = await response.json();
            const jwtToken = data.token; //get token
            const role = data.role; //get user role
            localStorage.setItem("jwtToken", jwtToken);
            setIsAuthenticated(true);
            setUserRole(role);
            if (role === "registeredUser") {
                navigate("/adopter/dashboard");
            } else {
                navigate("/admin/dashboard");
            }
            //navigate to dashboard upon successful login
            console.log("Login Data sent successfully", jwtToken);
        } else {
            // Handle error
            const errorMessage = await response.json();

            console.error("Error logging in", errorMessage);
            return errorMessage;
        }
    } catch (error) {
        console.error("Error:", error);
    }
};


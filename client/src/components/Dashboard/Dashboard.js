import React from "react";
import Quiz from "./BestMatches";
import Favorites from "./Favorites";
import "../../styles/Dashboard/dashboard.css";
import Inquiries from "./Inquiries";

function Dashboard(props) {
    const { favoriteDogs, setFavoriteDogs } = props;
    return (
        <div className='Dashboard'>
            <Favorites
                favoriteDogs={favoriteDogs}
                setFavoriteDogs={setFavoriteDogs}
            />
            <Quiz />
            <Inquiries />
        </div>
    );
}

export default Dashboard;

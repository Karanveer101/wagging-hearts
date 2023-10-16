import React from "react";
import Main from "./Main/Main";
import Footer from "./Shared/Footer";
import Header from "./Shared/Header";
function App(props) {
    const { favoriteDogs, setFavoriteDogs, search, setSearch } = props;

    return (
        <div className='App'>
            <Header />
            <Main
                favoriteDogs={favoriteDogs}
                setFavoriteDogs={setFavoriteDogs}
                search={search}
                setSearch={setSearch}
            />
            <Footer />
        </div>
    );
}

export default App;

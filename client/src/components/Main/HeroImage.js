import React from "react";
import heroImage from "../../images/dog.jpeg";

function HeroImage() {
    return (
        <section className='heroImageContainer'>
            <img src={heroImage} alt='dogImage' id='dogImage' />
        </section>
    );
}

export default HeroImage;

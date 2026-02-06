import React from 'react'
import '../styles/hero.css';
import loaderAnimation from '../lottie/loader.json';
import Lottie from "react-lottie";

function Loader() {

    const loaderOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="loader-container">
            <Lottie
                options={loaderOptions}
                height={200}
                width={200}
                speed={2.5}
            />
            <p>Loading sarees...</p>
        </div>
    )
}

export default Loader


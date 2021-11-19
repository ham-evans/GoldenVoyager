import React from 'react';
import "./About.css";
import rap from '../images/bitbotRap.mp4'
import pattern from '../images/star2.jpeg';
import pic from '../images/8.png'

export default function About () {
    return (
        <div className="about" id="project" style={{ backgroundImage: `url(${pattern})` }}>
            <div className="about__container"  >
                <h1>About Bit Bot Society</h1> 
                <p>Bit Bot Society is a collection of 9,999 Robot NFTs living on the Ethereum blockchain who beep boop right into the Metaverse. Each Bit Bot NFT is uniquely generated from a pool of 152+ different traits!</p>
            </div>
            <div className="about__wrapperImg">
                <img src={pic} alt="BitBot" />
            </div>
        </div>
    );
}

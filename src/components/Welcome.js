import React from 'react';
import "./Welcome.css";
import planet from '../gvimages/Tygrisol.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";

export default function Welcome () {
    return (
        <div className="welcome" id="about">
            <div className="welcome__wrapper">
                <div className="welcome__imgContainer">
                    <img src={planet} alt="Giraffe Gif"/>
                </div>
                <div className="welcome__container">
                    <h1>ABOUT GOLDEN VOYAGER</h1> 
                    <p>Golden Voyager Party is a collection of 9,000 ERC-721 Tokens on the Ethereum Blockchain.  Our goal is to connect digital nomads, kickstart NFT creative careers, & turn Bali into the NFT capital of this side of the world.</p>
                    <p>Short term plans for Golden Voyager NFT holders include live DJ sets over Discord and artist Skillshare.</p>
                    <p>Longer term, Golden Voyager NFT holders will receive global networking access, involvement with a creative/artist incubator, and significant community grants for project development</p>
                    <button className="welcome__button"><a href="https://discord.com/invite/goldenvoyagerparty" target="_blank" rel="noreferrer" className="welcome__link">JOIN THE DISCORD</a></button>
                </div>
            </div>
        </div>
    
    );
}

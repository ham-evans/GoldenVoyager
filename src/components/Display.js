import React from 'react';
import "./Display.css";
import turtles from '../gvimages/crew-avid-turtles.gif'
import eagle from '../gvimages/crew-breezy-eagle.gif'
import tiger from '../gvimages/crew-spicy-tiger.gif'

export default function Display () {
    return (
        <div className="display__wrapper" id="roadmap">
            <div className="display">
                <div className="display__container">
                    <div className="display__individual">
                        <img src={tiger} alt="GVP Tiger"/>
                        <div className="display__individualText">
                            <h2>TYGRISONIANS</h2>
                            <p>The Tygrisonians are playful and flirtatious, with all. Because of this, they are seen as superficial and sly. Tygris value looks, reputation, status, humor, family, and loyalty. Their home planet (Tygris) was a tropical planet filled with resources and dangers.</p>
                        </div>
                    </div>
                    <div className="display__individual">
                        <img src={eagle} alt="GVP Eagle" />
                        <div className="display__individualText">
                            <h2>AQUILANS</h2>
                            <p>Aquilans are blunt individualists with a strong sense of justice and fairness. Aquilan culture centres itself around the theatre, a place of public speeches and performances. They value an egalitarian society and prize civic duty born out of personal freedom.</p>
                        </div>
                    </div>
                    <div className="display__individual">
                        <img src={turtles} alt="GVP Turtle" />
                        <div className="display__individualText">
                            <h2>TURTURIANS</h2>
                            <p>Turturians come from a watery planet with a mild climate overall and subtropical areas near the equator. They prize community, their spiritual traditions, and philosophy. Turturians enjoy celebrations - their festivals include dance, music, and storytelling.</p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
}
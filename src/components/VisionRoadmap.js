import React from "react";

import './VisionRoadmap.css'

export default function VisionRoadmap () {
    return(
        <div className="visionroadmap" id="direction">
            <div className="visionroadmap__wrapper">
                <div className="vision">
                    <h1>OUR VISION</h1>
                    <p>Our goal is to co-create a fully immersive brand experience with the GVP.  Our holders will get to enjoy & participate in the ongoing development of the worlds our Voyagers inhabit across multiple platforms with a keen focus on Story-telling, creative communities, gaming, skill-shares & collaboration.</p>
                </div>
                <div className="roadmap2">
                    <h1>ROADMAP V1.1</h1>
                    <div className="roadmap2__wrapper">
                        <h3>5% - Lore development begins & updated every other day.</h3>
                        <h3>15% - Your own personal 3D art gallery called, "the station"</h3>
                        <h3>25% - Story begins to be turned into comic format, often as a live skill-share</h3>
                        <h3>50% - sandbox + NFT worlds development (already begun)</h3>
                        <h3>75% - begin development of 3D characters for future use in our worlds + provide a foundation for animated initiatives</h3>    
                        <h3>100% - 20% creator DAO launchpad for people and brands building visions that support the overall GVP story/world-building/gaming vibe</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
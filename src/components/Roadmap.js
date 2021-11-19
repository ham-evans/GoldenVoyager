import React, {useState} from 'react';
import "./Roadmap.css";

export default function Roadmap () {
    const [showResults1, setShowResults1] = useState(false)
    const [showResults2, setShowResults2] = useState(false)
    const [showResults3, setShowResults3] = useState(false)
    const [showResults4, setShowResults4] = useState(false)
    const onClick1 = () => setShowResults1(!showResults1)
    const onClick2 = () => setShowResults2(!showResults2)
    const onClick3 = () => setShowResults3(!showResults3)
    const onClick4 = () => setShowResults4(!showResults4)

    return (
        <div className="roadmap" id="direction">
            <div className="roadmap__wrapper">
                <div className="roadmap__container"  >
                    <h1>GOLDEN VOYAGER FUTURE DIRECTIONS</h1> 
                    <ul>
                        <li onClick={onClick1}>
                            <h4 className={showResults1 ? 'roadmap__minus' : 'roadmap__plus'}>1. Airdrops, Land Vault, and Voyager Resort Experience</h4>
                            { showResults1 ? <div>
                                    <p>-Airdrops of 100 order of shadows symbols + the extra 1:1 voyager</p>
                                    <p>-We begin to officially build in Land Vault with the communities idea's & involvement.</p>
                                    <p>-Some voyagers will be nominated & voted from within the community to be invited to visit the first official Resort experience provider in Bali to partner with The Collective Check it out here : https://zin.world/ (this will be an all expenses paid trip with the intent of being as life changing as we can possibly imagine)</p>
                                </div> 
                            : null }
                        </li>
                        <li onClick={onClick2}>
                            <h4 className={showResults2 ? 'roadmap__minus' : 'roadmap__plus'}>2. Companion Mounts, Comic Books, Voyager Digital Nomad Event</h4>
                            { showResults2 ? <div>
                                    <p>-We announce how the companion mounts will work & their additional utilities</p>
                                    <p>-We have our lore converted into comic book formats.</p>
                                    <p>-We have our first voyager sponsored digital nomad event in Bali - free for Voyagers. Other fees generated from the event will be split 50/50 between our DAO + a local charity focused on young artists. (looking for a fitting charity candidate still)</p>
                                </div> 
                            : null }
                        </li>
                        <li onClick={onClick3}>
                            <h4 className={showResults3 ? 'roadmap__minus' : 'roadmap__plus'}>3. DA0, Professional Creative Coaches, Tokens as Reedemable Rewards</h4>
                            { showResults3 ? <div>
                                    <p>-Our 20% creator DAO fund is launched.</p>
                                    <p>-We bring in professional coaching support for creatives that are enthusiastically building their skillsets & contributing to the IP.</p>
                                    <p>-We begin to explore using tokens as mission rewards which you will be able to use to purchase cosmetic upgrades / weapons & whatever else is built into our eco-system down the road.</p>
                                </div> 
                            : null }
                        </li>
                        <li onClick={onClick4}>
                            <h4 className={showResults4 ? 'roadmap__minus' : 'roadmap__plus'}>4. 3D Voyagers and Modals, In-Person Bali Voyager Event</h4>
                            { showResults4 ? <div>
                                    <p>-We begin creating simple 3D full bodied Voyagers ready for the metaverse in collaboration with The Avatar Maker.</p>
                                    <p>-We begin to work on giving you a database of these 3D files so you can go to a 3D printer & have your NFT's made into a physical collectible if you desire.</p>
                                    <p>-We fly up to 20 voyagers out to Bali for a first of it's kind NFT event, we want the whole world to hear about this trip.</p>
                                </div> 
                            : null }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

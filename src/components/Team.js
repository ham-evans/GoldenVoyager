import React from 'react';
import "./Team.css";
import tycollects from '../gvimages/tycollects.png'
import adapt from '../gvimages/adapt.png'
import fourth from '../gvimages/4th.png'
import katy from '../gvimages/katy.png'
import habibi from '../gvimages/habibi.png'
import dj from '../gvimages/dj.png'
import dekon from '../gvimages/dekon.png'
import viole from '../gvimages/viole.png'
import bobbums from '../gvimages/bobbums.png'
import boomer from '../gvimages/Boomer-avatar.png'
import master from '../gvimages/master.png'
import order from '../gvimages/order.jpeg'
import golden from '../gvimages/goldenx.jpeg'
import ham from '../gvimages/hammm.jpg'

export default function Team () {
    return (
        <div className="team" id="team">
            <div className="team__container">
                <div className="team__core">
                    <h1>THE CORE TEAM</h1>
                    <div className="team__coreWrapper">
                        <div className="team__individual">
                            <a href="https://twitter.com/tyinlife" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={tycollects} alt="tycollects" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>TyCollects.eth</h2>
                                    <p>Head of Strategy & Founder of 'The Collective'</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/tyinlife" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={adapt} alt="adapt" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Adapt Sites</h2>
                                    <p>Head of Systems and Tech</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/4thCulture_" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={fourth} alt="fourth" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>4thCulture.eth</h2>
                                    <p>Head of Art</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/katymarks_x" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={katy} alt="katy" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Katy Marks</h2>
                                    <p>Social and Community Lead</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/suleiman_kenny" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={habibi} alt="habibi" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Habibi</h2>
                                    <p>Tech Wiz, Off-Chain Utility & More</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/dj_jnr" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={dj} alt="dj" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Dj_Jnr</h2>
                                    <p>Head of Music & Talent Scout</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="team__core">
                    <h1>THE WRITING TEAM</h1>
                    <div className="team__coreWrapper">
                        <div className="team__individual">
                            <a href="https://twitter.com/Dekoningtan" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={dekon} alt="dekon" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Dekoningtan</h2>
                                    <p>Lead Lore Master</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={viole} alt="viole" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Viole</h2>
                                    <p>Lore-Master of the Tygrisonians</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={bobbums} alt="bobbums" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Mr. Bobbums</h2>
                                    <p>Lore-Master of the Aquilans</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="team__core">
                    <h1>OUR PARTNERS</h1>
                    <div className="team__coreWrapper">
                        <div className="team__individual">
                            <a href="https://twitter.com/Boomer_gm" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={boomer} alt="boomer" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Boomer</h2>
                                    <p>Land Vault</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/Metaciple" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={master} alt="master" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Masterbuzz</h2>
                                    <p>Avatar Maker</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/_OrderOfShadows" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={order} alt="order" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>The Order Of Shadows</h2>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/goldenxnft" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={golden} alt="golden" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Golden X</h2>
                                    <p>Janitor</p>
                                </div>
                            </a>
                        </div>
                        <div className="team__individual">
                            <a href="https://twitter.com/1hammm" target="_blank" rel="noreferrer">
                                <div className="team__imgWrapper">
                                    <img src={ham} alt="ham" />
                                </div>
                                <div className="text__wrapper">
                                    <h2>Hammm.eth</h2>
                                    <p>Web Developer</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    );
}

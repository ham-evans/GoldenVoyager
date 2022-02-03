import React, { Component } from 'react'; 
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '../gvimages/logoGif.gif'

import "./Navbar.css";

export default class Navbar extends Component { 
  state = {
    isOpen: false
  };

  handleToggle = () => { 
    this.setState({ isOpen: !this.state.isOpen })
  };

  render () {
    return (
      <nav className={this.state.isOpen ? "navbar active" : "navbar"} id="#fullhome">
        <div className="nav-container">
          <HashLink smooth to="#fullhome" className="nav-logo">
            <img className="nav__imgLogo" src={logo} alt="GATB Logo"/>
          </HashLink>

          <ul className={this.state.isOpen ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <HashLink
                smooth
                to="#about"
                className="nav-links"
              >
                ABOUT
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink
                smooth
                to="#direction"
                className="nav-links"
              >
                DIRECTION
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink
                smooth 
                to="#team"
                className="nav-links"
              >
                TEAM
              </HashLink>
            </li>
            <li className="nav-item">
              <a className="nav-links" href="https://twitter.com/GVoyagerParty" target="_blank" rel="noopener noreferrer" >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-links" href="https://discord.gg/aNxxVrreNq" target="_blank" rel="noopener noreferrer" >
                <FontAwesomeIcon icon={faDiscord} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-links" href="https://medium.com/@GoldenVoyagerPartyV2" target="_blank" rel="noopener noreferrer" >
                <FontAwesomeIcon icon={faMedium} />
              </a>
            </li>
          </ul>
          <div className="nav-icon" onClick={this.handleToggle}>
            {this.state.isOpen ? <FontAwesomeIcon icon={faTimes} />
              : <FontAwesomeIcon icon={faBars} />
            }
          </div>
        </div>
      </nav>
    );
  }
}
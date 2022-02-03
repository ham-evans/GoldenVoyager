import React, { Component } from 'react'; 
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '../gvimages/logoGif.gif'

import "./NavbarMint.css";

export default class NavbarMint extends Component { 
  state = {
    isOpen: false
  };

  handleToggle = () => { 
    this.setState({ isOpen: !this.state.isOpen })
  };

  render () {
    return (
      <nav className={this.state.isOpen ? "navbarMint active" : "navbarMint"} id="#fullhome">
        <div className="navMint-container">
          <HashLink smooth to="#fullhome" className="navMint-logo">
            <img className="navMint__imgLogo" src={logo} alt="GATB Logo"/>
          </HashLink>
          
          <div className="navMint__space"/>

          <ul className={this.state.isOpen ? "navMint-menu active" : "navMint-menu"}>
            <li className="navMint-item">
              <HashLink
                smooth
                to="/"
                className="navMint-links"
              >
                RETURN HOME
              </HashLink>
            </li>
            <li className="navMint-item">
              <a className="navMint-links" href="https://twitter.com/GVoyagerParty" target="_blank" rel="noopener noreferrer" >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="navMint-item">
              <a className="navMint-links" href="https://discord.gg/aNxxVrreNq" target="_blank" rel="noopener noreferrer" >
                <FontAwesomeIcon icon={faDiscord} />
              </a>
            </li>
            <li className="navMint-item">
              <a className="navMint-links" href="https://medium.com/@GoldenVoyagerPartyV2" target="_blank" rel="noopener noreferrer" >
                <FontAwesomeIcon icon={faMedium} />
              </a>
            </li>
          </ul>
          <div className="navMint-icon" onClick={this.handleToggle}>
            {this.state.isOpen ? <FontAwesomeIcon icon={faTimes} />
              : <FontAwesomeIcon icon={faBars} />
            }
          </div>
        </div>
      </nav>
    );
  }
}
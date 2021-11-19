import React, { Component } from 'react'; 
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
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
              <Link className="navMint-links" to={{ pathname: "https://twitter.com/GVoyagerParty" }} target="_blank" >
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
            </li>
            <li className="navMint-item">
              <Link className="navMint-links" to={{ pathname: "https://discord.com/invite/goldenvoyagerparty" }} target="_blank" >
                <FontAwesomeIcon icon={faDiscord} />
              </Link>
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
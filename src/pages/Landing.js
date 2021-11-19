import React from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Roadmap from '../components/Roadmap'
import Display from '../components/Display'
import Team from '../components/Team'
import Footer from '../components/Footer'

export default function Landing () { 
    return (
        <>
            <Navbar />
            <Home />
            <Display />
            <Welcome />
            <Roadmap />
            <Team />
            <Footer />
        </>
    );
}
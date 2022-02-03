import React from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import VisionRoadmap from '../components/VisionRoadmap'
import Bonuses from '../components/Bonuses';
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
            <VisionRoadmap />
            <Bonuses />
            <Team />
            <Footer />
        </>
    );
}
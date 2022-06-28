import React from 'react'
import { useEffect } from 'react';
import Menu from "./Menu";
import WallofD3 from "./WallofD3";
import ClubActivities from "./ClubActivities";
import HousingDashboard from "./HousingDashboard";
import WeatherDashboard from "./WeatherDashboard";
import {projects} from "../Util/HelperData";
import {Routes, Route, Link} from 'react-router-dom'
import ScrollToTop from '../Util/ScrollToTop';

const App = () => {

    return (
        <>
            <article className="homebtn">
                <Link to='/' className="btnH">
                Home
                </Link>
            </article>
            <main>
                <ScrollToTop>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='WallofD3' element={<WallofD3 />} />
                        <Route path='HousingDashboard' element={<HousingDashboard />} />
                        <Route path='ClubActivities' element={<ClubActivities />} />
                    </Routes>
                </ScrollToTop>  
            </main>
        </>
        
    )
}

export default App

const Home = () => {

    return (
        <>
            <section className="intro">
                <h3 className="heading1">Welcome, I'm</h3>
                <h1 className="heading2">Anthony Carnero</h1>
                <h3>
                I write code, create user-friendly interfaces, and visualize data.
                <br />
                Currently, searching for a new role as a Full-Stack or Frontend
                Enginner.
                </h3>
                <h3>Checkout some of my visualzations and dashboards down below.</h3>
            </section>
            <section className="projectHeading">
                <h1 className="heading2">Projects</h1>
            </section>

            {projects.map((project, i) => (
                <section className="projectSec" key={i}>
                <h1 className="heading2">{project.title}</h1>
                <h3 className="heading1">{project.message}</h3>
                <h4 className="toolHeader">Technologies Used: </h4>
                <ul className="toolContainer">
                    {project.tools.map((tool, i) => (
                    <li className={`toolItem ${tool}`} key={i}>
                        {tool}
                    </li>
                    ))}
                </ul>
        
                <Link
                    className="pagebtn"
                    to={project.identifier}
                >
                    Click to View
                </Link>
                </section>
            ))}
            <section className="sourcesContainer">
                <h1 className="sourceHeading">View Dataset Sources</h1>
                <Link
                className="pagebtn"
                to="ClubActivities"
                >
                Click to View
                </Link>
            </section>
        </>
      );
}

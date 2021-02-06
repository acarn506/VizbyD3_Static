import React from "react";

const projects = [
  {
    identifier: "WallofD3",
    title: "Wall of D3",
    message: `A collection of the first charts I've made using D3.js and Scalable vector graphics. As you work your way down the wall, the charts will include more advanced concepts to visualizing actual datasets. All implemented datasets are stored on the backend and queried from a NeDB management system.`,
    tools: ["React", "D3.js", "SVG", "Node.js", "NeDB"]
  },
  {
    identifier: "HousingDashboard",
    title: "Housing Dashboard",
    message: `Here I created a dashboard using data from a Kaggle Challenge on
    housing prices that were assigned to me during a Machine Learning
    Course. The purpose of this dashboard was to use the given training
    data in order to get a perspective on which house features had the
    most influence on the predicted feature being the house price.`,
    tools: ["React", "D3.js", "Node.js", "SVG", "Mocha", "NeDB"]
  },
  {
    identifier: "Dashboard",
    title: "SI Dashboard",
    message: `One of my first dashboards built to be part of an app for tutors at
    Cal State East Bay who provide an academic session. The app solved the
    problem of keeping track of students who attend sessions, eliminated
    collecting student information by hand, and manually entering
    information into a database. I implemented the dashboard with a dark
    mode scenery which I thought was pretty cool.`,
    tools: ["React", "Sass"]
  }
];

const Home = props => {
  function showHandler(event) {
    props.showHandler(event);
  }

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

          <button
            className="pagebtn"
            onClick={() => showHandler(project.identifier)}
          >
            Click to View
          </button>
        </section>
      ))}
      <section className="sourcesContainer">
        <h1 className="sourceHeading">View Dataset Sources</h1>
        <button
          className="pagebtn"
          onClick={() => showHandler("ClubActivities")}
        >
          Click to View
        </button>
      </section>
    </>
  );
};

export default Home;

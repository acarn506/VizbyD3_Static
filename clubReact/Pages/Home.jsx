import React from "react";

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
          I wrtie code, create user-friendly interfaces, and visualize data.
          <br />
          Currently, searching for a new role as a Full-Stack or Frontend
          Enginner.
        </h3>
        <h3>Checkout some of my visualzations and dashboards down below.</h3>
      </section>
      <section className="secA">
        <h1 className="heading2">Wall of D3</h1>
        <h3 className="heading1">
          A collection of the first charts i've made using D3.js. <br />
          As you work your way down the wall, the charts will include more
          advanced concepts or visualize actual datasets.
        </h3>

        <button className="pagebtn" onClick={() => showHandler("WallofD3")}>
          Click to View
        </button>
      </section>
      <section className="secB">
        <h1 className="heading2">Housing Dashboard</h1>
        <h3 className="heading1">
          A collection of the first charts i've made using D3.js. <br />
          As you work your way down the wall, the charts will include more
          advanced concepts or visualize actual datasets.
        </h3>

        <button
          className="pagebtn"
          onClick={() => showHandler("HousingDashboard")}
        >
          Click to View
        </button>
      </section>
      <section className="secC">
        <h1 className="heading2">SI Dashboard</h1>
        <h3 className="heading1">
          A collection of the first charts i've made using D3.js. <br />
          As you work your way down the wall, the charts will include more
          advanced concepts or visualize actual datasets.
        </h3>

        <button className="pagebtn" onClick={() => showHandler("Dashboard")}>
          Click to View
        </button>
      </section>
    </>
  );
};

export default Home;

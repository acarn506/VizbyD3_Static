import React from "react";
import BarChart from "../Components/BarChart";
import BarChartUpdate from "../Components/BarChart_Update";
import ScatChart from "../Components/ScatChart";
import StatesChart from "../Components/StatesChart";
import Avocado from "../Components/Avocado";
import { urlServer, urlLocal } from "../clientURL";

import {
  randomDataGenerator,
  randomDataScatGenerator
} from "../HelperFunctions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataUpdate: [],
      scatData: [],
      stateData: []
    };
  }

  // fetch state data
  getStateData() {
    console.log("fetch", urlServer);
    let that = this;
    // A promise for the response
    let myRes = fetch(urlServer + "states");
    // A promise for the body
    let myBody = myRes.then(function(res) {
      // Work with response
      console.log(`${res.statusText} response for ${res.url}`);
      // returns a promise for the body
      return res.json();
    });

    myBody
      .then(function(body) {
        let data = body;
        that.setState({ stateData: data });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  componentDidMount() {
    this.getStateData();
    this.updateData();
  }

  updateData() {
    let newData = randomDataGenerator(25);
    let newScatData = randomDataScatGenerator(25);
    this.setState({
      data: newData,
      dataUpdate: newData,
      scatData: newScatData
    });
  }

  barUpdate(type) {
    if (type == "normal") {
      let newData = randomDataGenerator(this.state.data.length);
      this.setState({ data: newData });
    } else {
      let newData = randomDataGenerator(this.state.dataUpdate.length);
      this.setState({ dataUpdate: newData });
    }
  }

  barSingleUpdate() {
    let newLength = this.state.dataUpdate.length + 1;
    let newData = [...this.state.dataUpdate];
    let newBar = Math.floor(Math.random() * newLength);
    newData.push(newBar);
    this.setState({ dataUpdate: newData });
  }

  scatUpdate() {
    let newScatData = randomDataScatGenerator();
    this.setState({ scatData: newScatData });
  }

  sortStates(event) {
    let stateData = [...this.state.stateData];
    let sortedData = [];

    if (event === "ascend") {
      sortedData = stateData.sort((a, b) => {
        if (a.population > b.population) {
          return 1;
        }
        if (a.population < b.population) {
          return -1;
        }
        return 0;
      });
    }

    if (event === "descend") {
      sortedData = stateData.sort((a, b) => {
        if (a.population < b.population) {
          return 1;
        }
        if (a.population > b.population) {
          return -1;
        }
        return 0;
      });
    }

    this.setState({ stateData: sortedData });
  }

  render() {
    return (
      <>
        <h1>Home</h1>
        <h2>Bar Chart with Random Data Built from SVG Elements</h2>
        <section className="chartB">
          <BarChart data={this.state.data} />
        </section>
        <button id="updateBtn" onClick={() => this.barUpdate("normal")}>
          Update
        </button>
        <h2>Updateable Bar Chart with Add Additional Bar Functionality</h2>
        <section className="chartD">
          <BarChartUpdate data={this.state.dataUpdate} />
        </section>
        <section>
          <button id="updateBtn" onClick={() => this.barUpdate("update")}>
            Update
          </button>
          <button id="updateBtn" onClick={() => this.barSingleUpdate()}>
            Add
          </button>
        </section>

        <h2>Scatterplot using D3's Scale & Axes</h2>
        <section className="chartC">
          <ScatChart data={this.state.scatData} />
        </section>
        <button id="updateBtn" onClick={() => this.scatUpdate()}>
          Update
        </button>
        <h2>U.S. State Populations</h2>
        <section>
          <StatesChart data={this.state.stateData} />
        </section>
        <section>
          <button id="updateBtn" onClick={() => this.sortStates("ascend")}>
            Ascending
          </button>
          <button id="updateBtn" onClick={() => this.sortStates("descend")}>
            Descending
          </button>
        </section>
        <section>
          <h2>Average Avocado Prices in California</h2>
          <Avocado />
        </section>
      </>
    );
  }
}

export default Home;

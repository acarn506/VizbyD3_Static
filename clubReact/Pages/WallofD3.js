import React from "react";
import BarChart from "../Components/BarChart";
import BarChartUpdate from "../Components/BarChart_Update";
import ScatChart from "../Components/ScatChart";
import StatesChart from "../Components/StatesChart";
import Avocado from "../Components/Avocado";
import { urlServer, urlLocal, urlDeploy } from "../clientURL";

import {
  randomDataGenerator,
  randomDataScatGenerator
} from "../Util/HelperFunctions";

class WallofD3 extends React.Component {
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
    let that = this;
    // A promise for the response
    let myRes = fetch(urlDeploy + "states");
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
        <h1>Wall of D3</h1>
        <h2>Bar Chart Built from SVG Elements</h2>
        <section className="chartB">
          <BarChart data={this.state.data} />
        </section>
        <button id="updateBtn" onClick={() => this.barUpdate("normal")}>
          Update
        </button>
        <section className="infoBox">
          <p className="infoEntry">Description</p>
          <p className="pageInfo">
            One of my first D3 bar charts where color is used to visualize the
            magnitude of each bar.
            <br /> The bar charts random data can be updated by click shifting
            the layout of the chart.
          </p>
        </section>
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
        <section className="infoBox">
          <p className="infoEntry">Description</p>
          <p className="pageInfo">
            Similar to the chart above but with a button to update the chart
            with additional random data.
            <br /> The chart resizes itself to accommodate the newly added bars.
          </p>
        </section>

        <h2>Scatterplot using D3's Scale & Axes</h2>
        <section className="chartC">
          <ScatChart data={this.state.scatData} />
        </section>
        <button id="updateBtn" onClick={() => this.scatUpdate()}>
          Update
        </button>

        <section className="infoBox">
          <p className="infoEntry">Description</p>
          <p className="pageInfo">
            A simple scatter chart implemented to visualize a random generated
            dataset with an axis to match the generated data.
          </p>
        </section>

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
        <section className="infoBox">
          <p className="infoEntry">Description</p>
          <p className="pageInfo">
            My first chart using actual data that can be sorted and visualized
            in ascending or descending order. <br />
            Bars are highlighted when the arrow pointer is touching a specific
            bar.
          </p>
        </section>

        <section className="chartE">
          <h2>Average Avocado Prices in California</h2>
          <Avocado />
        </section>

        <section className="infoBox">
          <p className="infoEntry">Description</p>
          <p className="pageInfo">
            A line chart displaying the current trends of avocado prices. Axis
            labels placed within the chart bounds.
          </p>
        </section>
      </>
    );
  }
}

export default WallofD3;

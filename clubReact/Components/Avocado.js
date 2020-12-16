import React from "react";
import AvocadoChart from "./AvocadoChart";
import { urlLocal, urlServer } from "../clientURL";

class Advocado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadData: false
    };
  }

  // fetch state data
  getAvocadoData() {
    console.log(urlLocal);
    let that = this;
    // A promise for the response
    let myRes = fetch(urlLocal + "avocados");
    // A promise for the body
    let myBody = myRes.then(function(res) {
      // Work with response
      console.log(`${res.statusText} response for ${res.url}`);
      // returns a promise for the body
      return res.json();
    });

    myBody.then(function(body) {
      let data = body;
      console.log("data server", data);
      that.setState({ data: data });
      that.formatData();
    });
  }

  componentDidMount() {
    this.getAvocadoData();
  }

  formatData() {
    let avocados = [...this.state.data];
    let sortedData = [];

    sortedData = avocados.sort((a, b) => {
      if (a.Date > b.Date) {
        return 1;
      }
      if (a.Date < b.Date) {
        return -1;
      }
      return 0;
    });

    let reduceData = [];

    for (let i = 0; i < sortedData.length - 1; i++) {
      if (sortedData[i].Date === sortedData[i + 1].Date) {
        let average =
          (Number(sortedData[i].AveragePrice) +
            Number(sortedData[i + 1].AveragePrice)) /
          2;
        let temp = {
          Date: new Date(sortedData[i].Date),
          AveragePrice: Number(average.toFixed(2))
        };
        reduceData.push(temp);
      }
    }

    this.setState({
      data: reduceData,
      loadData: true
    });
  }

  render() {
    let avoChart = null;
    if (this.state.loadData) {
      avoChart = <AvocadoChart data={this.state.data} />;
    } else {
      avoChart = <h1>Loading Data...</h1>;
    }

    return <>{avoChart}</>;
  }
}

export default Advocado;

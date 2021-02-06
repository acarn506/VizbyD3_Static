import React from "react";
import { urlLocal, urlServer, urlDeploy } from "../clientURL";

class ClubActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
  // get activities list
  getHandler() {
    let that = this;
    // A promise for the response
    let myRes = fetch(urlDeploy + "activities");
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
        that.setState({
          events: data
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  componentDidMount() {
    this.getHandler();
  }

  render() {
    let eventList = this.state.events.map((e, i) => {
      return (
        <tr key={i} className="acttr">
          <td className="acttd">{e.name}</td>
          <td className="acttd">{e.source}</td>
          <td className="acttd">{e.year}</td>
        </tr>
      );
    });
    return (
      <>
        <h1>Club Activities</h1>

        <table className="actTable">
          <thead className="acthead">
            <tr className="acttr">
              <th className="actth">Name</th>
              <th className="actth">Source</th>
              <th className="actth">Year</th>
            </tr>
          </thead>

          <tbody>{eventList}</tbody>
        </table>
      </>
    );
  }
}

export default ClubActivities;

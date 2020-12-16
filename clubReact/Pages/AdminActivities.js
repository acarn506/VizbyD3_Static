import React from "react";
import { urlLocal, urlServer } from "../clientURL";

class AdminActivites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      source: "",
      year: "",
      events: []
    };
  }

  nameHandler(event) {
    this.setState({ name: event.target.value });
  }

  sourceHandler(event) {
    this.setState({ source: event.target.value });
  }

  yearHandler(event) {
    this.setState({ year: event.target.value });
  }

  // get activities list
  getHandler() {
    let that = this;
    // A promise for the response
    let myRes = fetch(urlLocal + "activities");
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

  // remove activity
  removeHandler(event) {
    let that = this;

    let remove_id = event.target.value;

    // A promise for the response
    let myRes = fetch(urlLocal + "activities/" + remove_id, {
      method: "delete"
    });
    // A promise for the body
    let myBody = myRes.then(function(res) {
      // Work with response
      console.log(`${res.statusText} response for ${res.url}`);
      // returns a promise for the body
      return res.json();
    });

    myBody
      .then(function(body) {
        //fetch updated list
        that.getHandler();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  // post new activity
  addHandler() {
    let that = this;

    let data = {
      name: this.state.name,
      source: this.state.source,
      year: this.state.year
    };
    // A promise for the response
    let myRes = fetch(urlLocal + "activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    // A promise for the body
    let myBody = myRes.then(function(res) {
      // Work with response
      console.log(`${res.statusText} response for ${res.url}`);
      // returns a promise for the body
      return res.json();
    });

    myBody
      .then(function(body) {
        // fetch updated list
        that.getHandler();
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
        <tr key={i}>
          <td>
            <button
              type="submit"
              value={e._id}
              onClick={this.removeHandler.bind(this)}
            >
              Delete
            </button>
          </td>
          <td>{e.name}</td>
          <td>{e.source}</td>
          <td>{e.year}</td>
        </tr>
      );
    });
    return (
      <>
        <h1>Dataset Management</h1>

        <table className="actTable">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Source</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>{eventList}</tbody>
        </table>

        <section>
          <article className="activitiesContent">
            <h3>Add Dataset</h3>
            <label className="name" htmlFor="name">
              Name
            </label>
            <input
              type="name"
              value={this.state.name}
              placeholder="Dataset Name"
              onChange={this.nameHandler.bind(this)}
            />{" "}
            <br />
            <label className="source" htmlFor="source">
              Source
            </label>
            <input
              type="text"
              value={this.state.source}
              placeholder="Source"
              onChange={this.sourceHandler.bind(this)}
            />{" "}
            <br />
            <label className="year" htmlFor="year">
              Year
            </label>
            <input
              type="text"
              value={this.state.year}
              placeholder="Year"
              onChange={this.yearHandler.bind(this)}
            />{" "}
            <br />
            <button
              className="addbtn"
              type="submit"
              onClick={this.addHandler.bind(this)}
            >
              Add
            </button>{" "}
          </article>
        </section>
      </>
    );
  }
}

export default AdminActivites;

import React from "react";
import { urlLocal, urlServer } from "../clientURL";

class AdminMembership extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "",
      members: []
    };
  }

  // get member list
  getHandler() {
    let that = this;
    // A promise for the response
    let myRes = fetch(urlServer + "members");
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
          members: data
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  // post new member
  addHandler() {
    let that = this;

    let data = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role
    };
    // A promise for the response
    let myRes = fetch(urlServer + "members", {
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
        console.log(body);
        that.getHandler();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  // remove member
  removeHandler(event) {
    let that = this;

    let member_id = event.target.value;

    // A promise for the response
    let myRes = fetch(urlServer + "members/" + member_id, {
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
        console.log(body);
        that.getHandler();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  usernameHandler(event) {
    this.setState({ username: event.target.value });
  }

  passwordHandler(event) {
    this.setState({ password: event.target.value });
  }

  roleHandler(event) {
    this.setState({ role: event.target.value });
  }

  componentDidMount() {
    this.getHandler();
  }

  render() {
    let memberList = this.state.members.map((m, i) => {
      return (
        <tr key={i}>
          <td>
            <button
              type="submit"
              value={m._id}
              onClick={this.removeHandler.bind(this)}
            >
              Delete
            </button>
          </td>
          <td>{m.username}</td>
          <td>{m.role}</td>
        </tr>
      );
    });
    return (
      <>
        <h1>Club Members</h1>

        <table className="memTable">
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>{memberList}</tbody>
        </table>

        <section>
          <article className="activitiesContent">
            <h3>Add Member</h3>
            <label className="username" htmlFor="name">
              Username
            </label>
            <input
              type="name"
              value={this.state.username}
              placeholder="Username"
              minLength="6"
              onChange={this.usernameHandler.bind(this)}
            />{" "}
            <br />
            <label className="password" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              value={this.state.password}
              placeholder="Password"
              minLength="8"
              onChange={this.passwordHandler.bind(this)}
            />{" "}
            <br />
            <label className="role" htmlFor="role">
              role
            </label>
            <input
              type="text"
              value={this.state.role}
              placeholder="Role"
              onChange={this.roleHandler.bind(this)}
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

export default AdminMembership;

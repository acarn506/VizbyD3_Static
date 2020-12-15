import React from "react";
import { urlLocal, urlServer } from "../clientURL";

class Membership extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      response: false
    };
  }

  addHandler() {
    console.log("clicked");
    let that = this;

    let data = {
      username: this.state.username,
      password: this.state.password,
      role: "member"
    };
    // A promise for the response
    let myRes = fetch(urlServer + "applicant", {
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
        that.setState({
          response: true
        });
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

  render() {
    return (
      <>
        <h1 className="heading">Membership</h1>
        {this.state.response ? (
          <>
            <h2>Successful Signup!</h2>
            <h3>Welcome {this.state.username}</h3>
          </>
        ) : (
          <h2>Join Now!</h2>
        )}

        <section id="Application">
          <label>Username </label>
          <input
            type="text"
            id="name"
            minLength="6"
            value={this.state.username}
            onChange={() => this.usernameHandler(event)}
          />
          <label>Password </label>
          <input
            type="password"
            id="password"
            minLength="8"
            value={this.state.password}
            onChange={() => this.passwordHandler(event)}
          />

          <button
            type="submit"
            id="memberSubmit"
            onClick={() => this.addHandler()}
          >
            Sign me up!
          </button>
        </section>
      </>
    );
  }
}

export default Membership;

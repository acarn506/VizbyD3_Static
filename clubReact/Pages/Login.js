import React from "react";
import { urlLocal, urlServer, urlDeploy } from "../clientURL";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "guest",
      showUser: false
    };
  }

  usernameHandler(event) {
    this.setState({ username: event.target.value });
  }

  passwordHandler(event) {
    this.setState({ password: event.target.value });
  }

  loginHandler() {
    let that = this;

    let data = {
      username: this.state.username,
      password: this.state.password
    };
    // A promise for the response
    let myRes = fetch(urlDeploy + "login", {
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
        if (body.error) {
          console.log(body);
          return;
        }
        let user = body;
        that.setState({
          role: user.role,
          showUser: true
        });

        that.props.update(user.role, user.username);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <>
        <h1 className="heading">Login</h1>
        <section>
          {this.state.showUser ? (
            <>
              <h2>Welcome!</h2>
              <h3>
                {this.state.username}, {this.state.role}
              </h3>
            </>
          ) : (
            <></>
          )}
        </section>
        <section className="login">
          <label className="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            onChange={this.usernameHandler.bind(this)}
          />
          <label className="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={this.passwordHandler.bind(this)}
          />
          <button
            className="loginbtn"
            type="submit"
            onClick={this.loginHandler.bind(this)}
          >
            Login
          </button>
        </section>
      </>
    );
  }
}

export default Login;

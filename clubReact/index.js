import React from "react";
import ReactDOM from "react-dom";
import Menu from "./Pages/Menu";
import WallofD3 from "./Pages/WallofD3";
import ClubActivities from "./Pages/ClubActivities";
import HousingDashboard from "./Pages/HousingDashboard";
import WeatherDashboard from "./Pages/WeatherDashboard";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "member",
      show: "Home",
      user: ""
    };
  }

  showHandler(show) {
    this.setState({ show: show });
  }

  loginUpdate(role, user) {
    console.log(role, "", user);
    this.setState({
      role: role,
      user: user
    });
  }

  render() {
    let contents = null;

    switch (this.state.show) {
      case "Home":
        contents = <Home showHandler={this.showHandler.bind(this)} />;
        break;

      case "WallofD3":
        contents = <WallofD3 />;
        break;

      case "ClubActivities":
        contents = <ClubActivities />;
        break;

      case "HousingDashboard":
        contents = <HousingDashboard />;
        break;
      case "WeatherDashboard":
        contents = <WeatherDashboard />;
        break;
      case "Dashboard":
        contents = <Dashboard />;
        break;
      default:
        contents = <h2>Warning something went wrong!!</h2>;
    }
    return (
      <>
        <article className="homebtn">
          <button className="btnH" onClick={() => this.showHandler("Home")}>
            Home
          </button>
        </article>
        <main>{contents}</main>
      </>
    );
  }
}

// What is this? HTML mixed with JavaScript
ReactDOM.render(<App />, document.getElementById("root"));

/*
<Menu
role={this.state.role}
show={this.state.show}
showHandler={this.showHandler.bind(this)}
logoutUpdate={this.loginUpdate.bind(this)}
/> */

import React from "react";
import ReactDOM from "react-dom";
import Menu from "./Pages/Menu";
import Home from "./Pages/Home";
import ClubActivities from "./Pages/ClubActivities";
import Login from "./Pages/Login";
import Membership from "./Pages/Membership";
import AdminActivities from "./Pages/AdminActivities";
import AdminMembership from "./Pages/AdminMembership";
import Logout from "./Pages/Logout";
import HousingDashboard from "./Pages/HousingDashboard";
import WeatherDashboard from "./Pages/WeatherDashboard";

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
        contents = <Home />;
        break;

      case "ClubActivities":
        contents = <ClubActivities />;
        break;

      case "Login":
        contents = <Login update={this.loginUpdate.bind(this)} />;
        break;
      case "Membership":
        contents = <Membership />;
        break;
      case "AdminActivities":
        contents = <AdminActivities />;
        break;
      case "AdminMembership":
        contents = <AdminMembership />;
        break;
      case "Logout":
        contents = <Logout update={this.loginUpdate.bind(this)} />;
        break;
      case "HousingDashboard":
        contents = <HousingDashboard />;
        break;
      case "WeatherDashboard":
        contents = <WeatherDashboard />;
        break;
      default:
        contents = <h2>Warning something went wrong!!</h2>;
    }
    return (
      <main>
        <Menu
          role={this.state.role}
          show={this.state.show}
          showHandler={this.showHandler.bind(this)}
          logoutUpdate={this.loginUpdate.bind(this)}
        />
        {contents}
      </main>
    );
  }
}

// What is this? HTML mixed with JavaScript
ReactDOM.render(<App />, document.getElementById("root"));

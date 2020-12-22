import React from "react";
import { urlLocal, urlServer } from "../clientURL";

function Menu(props) {
  let style = {
    listStyleType: "none"
  };

  function logoutHandler() {
    // A promise for the response
    let myRes = fetch(urlLocal + "logout");
    // A promise for the body
    let myBody = myRes.then(function(res) {
      // Work with response
      console.log(`${res.statusText} response for ${res.url}`);
      // returns a promise for the body
      return res.json();
    });

    myBody
      .then(function(body) {
        let role = "guest";
        let username = "";
        props.logoutUpdate(role, username);
        props.showHandler("Home");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  function showHandler(event) {
    props.showHandler(event);
  }

  let buttonBar = null;

  switch (props.role) {
    case "guest":
      buttonBar = (
        <nav className="nav">
          <ul className="buttonBar" style={style}>
            <li>
              <button className="btn" onClick={() => showHandler("Home")}>
                Home
              </button>
            </li>
            <li>
              <button className="btn" onClick={() => showHandler("Login")}>
                Login
              </button>
            </li>
            <li>
              <button className="btn" onClick={() => showHandler("Membership")}>
                Membership
              </button>
            </li>
            <li>
              <button
                className="btn"
                onClick={() => showHandler("HousingDashboard")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="btn"
                onClick={() => showHandler("WeatherDashboard")}
              >
                Weather Dashboard
              </button>
            </li>
          </ul>
        </nav>
      );
      break;

    case "member":
      buttonBar = (
        <nav className="nav">
          <ul className="buttonBar" style={style}>
            <li>
              <button className="btn" onClick={() => showHandler("Home")}>
                Home
              </button>
            </li>
            <li>
              <button
                className="btn"
                onClick={() => showHandler("ClubActivities")}
              >
                Club Activites
              </button>
            </li>
            <li>
              <button className="btn" onClick={() => showHandler("Dashboard")}>
                Dashboard
              </button>
            </li>
            <li>
              <button className="btn" onClick={() => logoutHandler()}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      );
      break;
    case "admin":
      buttonBar = (
        <nav className="nav">
          <ul className="buttonBar" style={style}>
            <li>
              <button className="btn" onClick={() => showHandler("Home")}>
                Home
              </button>
            </li>
            <li>
              <button
                className="btn"
                onClick={() => showHandler("AdminActivities")}
              >
                Admin Activites
              </button>
            </li>
            <li>
              <button
                className="btn"
                onClick={() => showHandler("AdminMembership")}
              >
                Admin Membership
              </button>
            </li>
            <li>
              <button className="btn" onClick={() => logoutHandler()}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      );
      break;

    default:
      buttonBar = <h2>Warning, something went wrong!!</h2>;
  }

  return <>{buttonBar}</>;
}

export default Menu;

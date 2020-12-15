import React from "react";

const Logout = props => {
  function logoutHandler() {
    // A promise for the response
    let myRes = fetch("http://localhost:3003/logout");
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
        let role = "guest";
        let username = "";
        props.update(role, username);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <button className="logoutbtn" onClick={() => logoutHandler()}>
        Logout
      </button>
      <h2>Successful Logout, Goodbye!</h2>
    </>
  );
};

export default Logout;

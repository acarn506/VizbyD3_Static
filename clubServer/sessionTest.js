/* Testing the POST /tours/add API */
const fetch = require("node-fetch");
const urlBase = require("./testURL");

// const urlBase = "http://127.0.0.1:3434/";

function extractCookies(rawStrings) {
  let cookies = [];
  rawStrings.forEach(function(ck) {
    cookies.push(ck.split(";")[0]); // Just grabs cookie name=value part
  });
  return cookies.join(";"); // If more than one cookie join with ;
}

let addActivity = {
  url: urlBase + "activities",
  options: {
    method: "POST",
    body: JSON.stringify({
      name: "Test",
      source: "test script",
      year: "2020"
    }),
    headers: { "Content-Type": "application/json" }
  }
};

let loginAdmin = {
  url: urlBase + "login",
  options: {
    method: "POST",
    body: JSON.stringify({
      // admin user, see users.json file
      username: "Melia",
      password: "49OqspUq"
    }),
    headers: { "Content-Type": "application/json" }
  }
};

let loginMember = {
  url: urlBase + "login",
  options: {
    method: "POST",
    body: JSON.stringify({
      // admin user, see users.json file
      username: "Demetrice",
      password: "'E`Gj3iJ"
    }),
    headers: { "Content-Type": "application/json" }
  }
};

async function someTests() {
  console.log("Try adding tour without logging in");
  try {
    let res = await fetch(addActivity.url, addActivity.options);
    console.log(`Add Tour result: ${res.statusText}`);
  } catch (e) {
    console.log(`Error: ${e}\n`);
  }

  console.log("Login as admin, then adding tour");
  try {
    let res = await fetch(loginAdmin.url, loginAdmin.options);
    console.log(`login results: ${res.statusText}`);
    // Look at the cookie
    let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
    console.log(`Saved cookie: ${savedCookie}`);
    addActivity.options.headers.cookie = savedCookie;
    // User info from login
    let userInfo = await res.json();
    console.log(userInfo);
    res = await fetch(addActivity.url, addActivity.options);
    console.log(`Add Tour result: ${res.statusText}\n`);
    let data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(`Error: ${e}\n`);
  }

  console.log("Login as member, then try adding tour");
  try {
    let res = await fetch(loginMember.url, loginMember.options);
    console.log(`login results: ${res.statusText}`);
    // Look at the cookie
    let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
    console.log(`Saved cookie: ${savedCookie}`);
    addActivity.options.headers.cookie = savedCookie;
    // User info from login
    let userInfo = await res.json();
    console.log(userInfo);
    res = await fetch(addActivity.url, addActivity.options);
    console.log(`Add Tour result: ${res.statusText}\n`);
    let data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(`Error: ${e}\n`);
  }
}

someTests();

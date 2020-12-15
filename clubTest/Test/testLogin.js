const assert = require("chai").assert;
const fetch = require("node-fetch");
const urlBase = require("../testURLS");
const getCookies = require("../getCookies");

describe("Login Test", function() {
  let res;
  let activity = null;
  let myCookie = null;

  before(async function() {
    console.log("calling fetch");
    res = await fetch(urlBase + "activities");
    console.log("back from fetch");
    myCookie = getCookies(res);
  });

  it("cookie with appropiate name returned", function() {
    assert.include(myCookie, "vizID");
  });

  describe(`Login Sequence`, function() {
    before(async function() {
      res = await fetch(urlBase + "login", {
        method: "post",
        body: JSON.stringify({
          username: "Peg",
          password: "X'jE6G|@"
        }),
        headers: {
          "Content-Type": "application/json",
          cookie: myCookie
        }
      });
    });

    it("Good Login", function() {
      assert.equal(res.status, 200);
    });

    it("User Returned", async function() {
      let user = await res.json();
      assert.containsAllKeys(user, ["username", "role"]);
    });

    it("cookie session ID changed", function() {
      let cookie = getCookies(res);
      assert.notEmpty(cookie);
      assert.notEqual(myCookie, cookie);
      console.log(cookie, myCookie);
    });
  });

  describe(`Bad Login`, function() {
    it("Bad Username", async function() {
      before(async function() {
        res = await fetch(urlBase + "login", {
          method: "post",
          body: JSON.stringify({
            username: "Daran",
            password: "EJ%3er4x"
          }),
          headers: {
            "Content-Type": "application/json",
            cookie: myCookie
          }
        });
        assert.equal(res.status, 401);
      });
    });

    it("Bad Password", async function() {
      before(async function() {
        res = await fetch(urlBase + "login", {
          method: "post",
          body: JSON.stringify({
            username: "Ligia",
            password: "n5pLoS4|="
          }),
          headers: {
            "Content-Type": "application/json",
            cookie: myCookie
          }
        });
        assert.equal(res.status, 401);
      });
    });
  });
});

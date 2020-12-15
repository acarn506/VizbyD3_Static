const assert = require("chai").assert;
const fetch = require("node-fetch");
let student = 37;

loginTest();

function loginTest() {
  for (let i = student; i <= 60; i++) {
    console.log(
      "url: ",
      `https://www.drbsclasses.org/student${i}/node/` + "login"
    );

    describe(`Login Sequence Student${i}`, function() {
      let res;

      before(async function() {
        res = await fetch(
          `https://www.drbsclasses.org/student${i}/node/` + "login",
          {
            method: "post",
            body: JSON.stringify({
              email: "tirrivees1820@outlook.com",
              password: "49OqspUq"
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      });

      it("Good Login", function() {
        assert.equal(res.status, 200);
      });

      it("User Returned", async function() {
        let user = await res.json();
        assert.containsAllKeys(user, ["username", "role"]);
      });
    });

    describe(`Bad Login Student${i}`, function() {
      let res;

      it("Bad Email", async function() {
        before(async function() {
          res = await fetch(
            `https://www.drbsclasses.org/student${i}/node/` + "login",
            {
              method: "post",
              body: JSON.stringify({
                email: "chihhua1879@gmail.com",
                password: "'E`Gj3iJ"
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          assert.equal(res.status, 401);
        });
      });

      it("Bad Password", async function() {
        before(async function() {
          res = await fetch(
            `https://www.drbsclasses.org/student${i}/node/` + "login",
            {
              method: "post",
              body: JSON.stringify({
                email: "chihuahua1899@gmail.com",
                password: "'mE`Gj3iJr"
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          assert.equal(res.status, 401);
        });
      });
    });
  }
}

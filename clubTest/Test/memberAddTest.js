const assert = require("chai").assert;
const fetch = require("node-fetch");

memberAddTest();

function memberAddTest() {
  describe(`Add member`, function() {
    let res;

    before(async function() {
      res = await fetch(`http://localhost:3003/` + "members", {
        method: "post",
        body: JSON.stringify({
          username: "test14",
          password: "eoeurdo",
          role: "member"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    });

    it("Good member", function(done) {
      assert.equal(res.status, 200);
      done();
    });
  });

  describe(`Bad member`, function() {
    let res;

    it("Existing username", async function() {
      before(async function() {
        res = await fetch(`http://localhost:3003/` + "members", {
          method: "post",
          body: JSON.stringify({
            username: "Demetrice",
            password: "offmrfrn",
            role: "member"
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        assert.equal(res.status, 401);
      });
    });

    it("Existing Password", async function() {
      before(async function() {
        res = await fetch(`http://localhost:3003/` + "members", {
          method: "post",
          body: JSON.stringify({
            username: "Tom12Tan",
            password:
              "$2a$12$j.fbPekfxSBz9VOktprhQesc6IUozj0NVHx3ulldZ0ACf3m1GJxl2",
            role: "member"
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        assert.equal(res.status, 401);
      });
    });
  });
}

const assert = require("chai").assert;
const fetch = require("node-fetch");
let student = 37;

infoTest();

function infoTest() {
  for (let i = student; i <= 60; i++) {
    console.log(
      "url: ",
      `https://www.drbsclasses.org/student${i}/node/` + "info"
    );

    //grouping of tests
    describe(`Info Test Student${i}`, function() {
      let res;
      // "before" sets up environemnt before each test
      before(async function() {
        res = await fetch(
          `https://www.drbsclasses.org/student${i}/node/` + "info"
        );
      });
      // single test
      it("Good Request", function() {
        assert.equal(res.status, 200); // tests for 200 response
      });
      // single test
      it("User Returned", async function() {
        let user = await res.json();
        //test for returned key values
        assert.containsAllKeys(user, ["clubName", "ownerName", "ownerNetId"]);

        if (user) {
          console.log(user); //console user info
        }
      });
    });
  }
}

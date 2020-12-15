const assert = require("chai").assert;
const fetch = require("node-fetch");
let student = 5;

siteTest();

function siteTest() {
  for (let i = student; i <= 36; i++) {
    console.log(
      "url: ",
      `https://www.drbsclasses.org/student${i}/node/` + "info"
    );

    //grouping of tests
    describe(`Site Test Student${i}`, function() {
      let res;
      // "before" sets up environemnt before each test
      before(async function() {
        res = await fetch(`https://www.drbsclasses.org/student${i}/node/`);
      });
      // single test
      it("Good Request", function() {
        assert.equal(res.status, 200); // tests for 200 response
      });
    });
  }
}

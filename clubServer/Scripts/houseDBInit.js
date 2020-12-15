const Datastore = require("nedb");
const db = new Datastore({
  filename: "./DB/" + "housePrices.db",
  autoload: true
});

const avocados = require("../JsonData/train.json");

db.insert(avocados, function(err, newDocs) {
  if (err) {
    console.log("Something went wrong");
    console.log(err);
  } else {
    console.log(`Add ${newDocs.length} new documents`);
  }
});

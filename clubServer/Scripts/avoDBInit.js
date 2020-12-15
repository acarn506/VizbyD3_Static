const Datastore = require("nedb");
const db = new Datastore({
  filename: "./DB/" + "avocado.db",
  autoload: true
});

const avocados = require("../JsonData/avocado.json");

db.insert(avocados, function(err, newDocs) {
  if (err) {
    console.log("Something went wrong");
    console.log(err);
  } else {
    console.log(`Add ${newDocs.length} new documents`);
  }
});

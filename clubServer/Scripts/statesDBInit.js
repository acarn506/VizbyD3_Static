const Datastore = require("nedb");
const db = new Datastore({
  filename: __dirname + "/DB/states.db",
  autoload: true
});

const states = require("./JsonData/states.json");

db.insert(states, function(err, newDocs) {
  if (err) {
    console.log("Something went wrong when writing");
    console.log(err);
  } else {
    console.log("Added " + newDocs.length + " states");
  }
});

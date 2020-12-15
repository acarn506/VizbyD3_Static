const Datastore = require("nedb");

// members
const db = new Datastore({
  filename: "./DB/" + "clubUsers.db",
  autoload: true
});

const members = require("../JsonData/clubUsersHash");

db.insert(members, function(err, newDocs) {
  if (err) {
    console.log("Something went wrong");
    console.log(err);
  } else {
    console.log(`Add ${newDocs.length} new documents`);
  }
});

// activities
const db2 = new Datastore({
  filename: "./DB/" + "activities.db",
  autoload: true
});

const activities = require("../JsonData/activities");

db2.insert(activities, function(err, newDocs) {
  if (err) {
    console.log("Something went wrong");
    console.log(err);
  } else {
    console.log(`Add ${newDocs.length} new documents`);
  }
});

const bcrypt = require("bcryptjs");
const fs = require("fs");
const users = require("./JsonData/clubUsers.json");
let nrounds = 12;
let usersHashed = [];

let start = new Date();
console.log(`start password hashing with nrounds: ${nrounds}, ${start}`);

users.forEach(user => {
  let salt = bcrypt.genSaltSync(nrounds);
  user.password = bcrypt.hashSync(user.password, salt);
  usersHashed.push(user);
});

let elapsed = new Date() - start;
console.log(`Finished password hashing, ${elapsed / 1000} seconds.`);
fs.writeFileSync("clubUsersHash.json", JSON.stringify(usersHashed, null, 2));

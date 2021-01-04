const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Datastore = require("nedb-promises");
const port = process.env.PORT;
const session = require("express-session");
const Ajv = require("ajv");
const memberSchema = require("./ValidationSchemas/Member");
const ApplicantSchema = require("./ValidationSchemas/Applicant");
const ActivitySchema = require("./ValidationSchemas/Activity");
const fetch = require("node-fetch");

// Schema Validation Setup
let ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
let memberValidate = ajv.compile(require("./ValidationSchemas/Member.json"));
let applicantValidate = ajv.compile(
  require("./ValidationSchemas/Applicant.json")
);
let activityValidate = ajv.compile(
  require("./ValidationSchemas/Activity.json")
);

// Json parser
let jsonParse = express.json({ limit: "2000" });

// Session Setup
const cookieName = "vizID";
app.use(
  session({
    secret: "Visualization Website CSUEB",
    resave: false,
    saveUninitialized: false,
    name: cookieName
  })
);

// Session Code

// This initializes session state
const setUpSessionMiddleware = function(req, res, next) {
  console.log(`session object: ${JSON.stringify(req.session)}`);
  console.log(`session id: ${req.session.id}`);
  if (!req.session.user) {
    console.log("session user is null");
    req.session.user = { role: "guest" };
  }
  next();
};

app.use(setUpSessionMiddleware);

//app.use(express.static("public"));

// Use this middleware to restrict paths to only logged in users
const checkMemberMiddleware = function(req, res, next) {
  if (req.session.user.role === "guest") {
    res.status(401).json({ error: "Not permitted" });
  } else {
    console.log(`Session info: ${JSON.stringify(req.session)} \n`);
    next();
  }

  console.log(`Session info: ${JSON.stringify(req.session)} \n`);
  next();
};

// User this middlewave to restrict paths only to admins
const checkAdminMiddleware = function(req, res, next) {
  if (req.session.user.role !== "admin") {
    res.status(401).json({ error: "Not permitted" });
  } else {
    next();
  }
  next();
};

// Json error handler
function jsonErrors(err, req, res, next) {
  // prepare and send error response here, i.e.,
  // set an error code and send JSON message
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
  console.log(JSON.stringify(err));
  return;
}

let count = 0; // Visit count
let startDate = new Date(); // Server start Date time
let name = "Anthony Carnero";

app.get("/", function(req, res) {
  count++;
  res.send(`Hi from ${name}, Visited: ${count} times.`);
});

app.get("/uptime", function(req, res) {
  let curDate = new Date();
  res.send(
    `Current Date/Time: ${curDate.toLocaleString()}, Server Up Since: ${startDate.toLocaleString()}`
  );
});

app.get("/info", function(req, res) {
  // Just to test JSON capability
  res.json({
    clubName: "Data_Viz",
    ownerName: "Anthony Carnero",
    ownerNetId: "ui2545"
  });
});

let states = Datastore.create("./DB/states.db");

// get state data from db
app.get("/states", async function(req, res) {
  let data = await states.find({}, { state: 1, population: 1, _id: 0 });
  res.json(data);
});

let avocados = Datastore.create("./DB/avocado.db");

// get avocado data from db
app.get("/avocados", async function(req, res) {
  let data = await avocados.find(
    { region: "California" },
    { Date: 1, AveragePrice: 1, _id: 0 }
  );
  res.json(data);
});

let activities = Datastore.create("./DB/activities.db");

// get activites
app.get("/activities", checkMemberMiddleware, async function(req, res) {
  let data = await activities.find({});
  res.json(data);
});

app.post(
  "/activities",
  checkAdminMiddleware,
  jsonParse,
  function(req, res) {
    console.log(`Tempting to add activity: ${JSON.stringify(req.body)}`);
    let newActivity = req.body;
    let validActivity = activityValidate(newActivity);
    if (!validActivity) {
      console.log(activityValidate.errors);
      res.status(400).json({ error: "Invalid Data" });
      return;
    }

    activities.insert(newActivity);
    res.json(activities);
  },
  jsonErrors
);

app.delete("/activities/:id", checkAdminMiddleware, async function(req, res) {
  let activity_id = req.params.id;
  await activities.remove({ _id: activity_id });
  res.json(activities);
});

let members = Datastore.create("./DB/clubUsers.db");

// login
app.post(
  "/login",
  jsonParse,
  async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let user = await members.find({ username: username });
    user = user[0];

    if (!user) {
      res.status(401).json({
        error: true,
        message: "User/password error"
      });
      return;
    }

    let valid = bcrypt.compareSync(password, user.password);

    if (valid) {
      let oldInfo = req.session.user;
      req.session.regenerate(function(err) {
        if (err) {
          console.log(err);
        }
        let newUserInfo = Object.assign(oldInfo, user);

        delete newUserInfo.password;
        req.session.user = newUserInfo;
        console.log("login role", req.session.user.role);
        res.json(newUserInfo);
      });
    } else {
      res.status(401).json({
        error: true,
        message: "User/password error"
      });
      return;
    }
  },
  jsonErrors
);

// logout
app.get("/logout", function(req, res) {
  let options = req.session.cookie;
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.clearCookie(cookieName, options); // express api expires cookie
  res.json({ message: "Goodbye" });
});

app.get("/members", async function(req, res) {
  let data = await members.find({}, { password: 0 });
  res.json(data);
});

// admin adds member
app.post(
  "/members",
  checkAdminMiddleware,
  jsonParse,
  function(req, res) {
    console.log(`Tempting to add member: ${JSON.stringify(req.body)}`);
    let newMember = req.body;
    let validMember = memberValidate(newMember);
    if (!validMember) {
      console.log(memberValidate.errors);
      res.status(400).json({ error: "Invalid Data" });
      return;
    }
    members.insert(newMember);
    res.json(members);
  },
  jsonErrors
);

// applicant creates membership
app.post(
  "/applicant",
  jsonParse,
  function(req, res) {
    let newMember = req.body;
    console.log(`Tempting to add member: ${JSON.stringify(req.body)}`);
    let validMember = memberValidate(newMember);
    if (!validMember) {
      console.log(memberValidate.errors);
      res.status(400).json({ error: "Invalid Data" });
      return;
    }
    members.insert(newMember);
    res.json(members);
  },
  jsonErrors
);

app.delete("/members/:id", checkAdminMiddleware, async function(req, res) {
  let member_id = req.params.id;
  await members.remove({ _id: member_id });
  res.json(member_id);
});

// House Prices dashboard routes
let housePrices = Datastore.create("./DB/housePrices.db");

// get just sale prices
app.get("/housePrices", async function(req, res) {
  let data = await housePrices.find({}, { SalePrice: 1, _id: 0 });
  res.json(data);
});

// get house prices data from db
app.get("/housePrices/:feature", async function(req, res) {
  let feature = req.params.feature;
  let data = null;

  switch (feature) {
    case "OverallQual":
      data = await housePrices.find(
        {},
        { OverallQual: 1, SalePrice: 1, _id: 0 }
      );
      break;
    case "GrLivArea":
      data = await housePrices.find({}, { GrLivArea: 1, SalePrice: 1, _id: 0 });
      break;
    case "TotalBsmtSF":
      data = await housePrices.find(
        {},
        { TotalBsmtSF: 1, SalePrice: 1, _id: 0 }
      );
      break;

    case "GarageCars":
      data = await housePrices.find(
        {},
        { GarageCars: 1, SalePrice: 1, _id: 0 }
      );
      break;

    case "FullBath":
      data = await housePrices.find({}, { FullBath: 1, SalePrice: 1, _id: 0 });
      break;

    case "YearBuilt":
      data = await housePrices.find({}, { YearBuilt: 1, SalePrice: 1, _id: 0 });
      break;

    default:
      data = await housePrices.find({}, { SalePrice: 1, _id: 0 });
  }

  res.json(data);
});

// get all house price features
app.get("/allHouseFeatures", async function(req, res) {
  let data = await housePrices.find(
    {},
    {
      SalePrice: 1,
      GrLivArea: 1,
      OverallQual: 1,
      TotalBsmtSF: 1,
      GarageCars: 1,
      FullBath: 1,
      YearBuilt: 1,
      _id: 0
    }
  );

  res.json(data);
});

app.get("/dailyWeather", async function(req, res) {
  const api_key = process.env.WEATHER_API_KEY;

  const city = "Oakland";
  const state = "CA";
  const units = "imperial";
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=${units}&appid=${api_key}`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();
  console.table(weather_data);
  res.json(weather_data);
});

host = "localhost";

app.listen(port, host, function() {
  console.log(`deployTest.js app listening on IPv4: ${host}:${port}`);
});

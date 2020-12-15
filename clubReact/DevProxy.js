// Need Local install of parcel-bundler so we and import it below.
const Bundler = require("parcel-bundler");
// provides server-side logic
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

// Paths we want to forward to the server
const forward = [
  "/activities",
  "/login",
  "/logout",
  "/members",
  "/applicant",
  "/states",
  "/avocados",
  "/info"
];

// forward will determine what requests can be proxied
// target is our host/server to proxy to
app.use(forward, createProxyMiddleware({ target: "http://127.0.0.1:3003" }));

// Instance of the parcel.js bundler with the clients start file
const bundler = new Bundler("./index.html");
app.use(bundler.middleware());
// port for client application
app.listen(1234);

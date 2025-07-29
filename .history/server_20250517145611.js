//import express from "express";
//var express = require("express");
//var app = express();
import config from "./config/config.js"; 
import app from "./server/express.js";
import router from "./server/assets-router.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

//const assetsRouter = require("./server/assets-router");
app.use("/src", router);
/*app.use("/", function (req, res) {
  res.send("Welcome to User application");
});
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
  
app.listen(3000);
console.log("Server running at http://localhost:3000/");
//module.exports = app;
export default app;

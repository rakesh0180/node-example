const express = require("express");
const mongoose = require("mongoose");
const app = express();
//use to read incoming json/data
app.use(express.json());
const port = 3055;

//establish connection to database

mongoose
  .connect("mongodb://localhost:27017/july-2023")
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error " + err);
  });

const customers = [
  { id: 1, name: "ABC" },
  { id: 2, name: "BCD" },
  { id: 3, name: "CDE" },
  { id: 4, name: "DEF" },
];
//Request handler
app.get("/", (req, res) => {
  res.send("welcome to home" + port);
});

app.listen(port, () => {
  console.log("server running on port", port);
});

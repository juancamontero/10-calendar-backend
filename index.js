const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// console.log(process.env.PORT);

// 1. create express server
const app = express();

//Data Base
dbConnection();

//CORS
app.use(cors())

// Public directory
app.use(express.static("./public"));

// read and body parsing
app.use(express.json());

// 2. Define routes
// TODO Auth: create, login, logout, edit . token renew
app.use("/api/auth", require("./routes/auth"));

// TODO: CRUD of the events

// 3. listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// 2nd parameter is a callback function that runs when port hears something

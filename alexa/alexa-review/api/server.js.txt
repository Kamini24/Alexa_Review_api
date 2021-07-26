const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const fs = require("fs");

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./models");

// const controller = require("./controller/alexa.controller");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });




//route to router module

// app.get('*', (req, res) => {
//   res.status(200).send('Welcome Home');
// });
const port = 3002;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});

module.exports = app;
require('./config/route.js')(app);




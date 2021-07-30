const express = require('express');
const app = express();
// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./config/sequalizeDBConfig");
db.sequelize.sync();
const port = 3002;
require('./config/routeConfig.js')(app);
//route to router module;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});

module.exports = app;





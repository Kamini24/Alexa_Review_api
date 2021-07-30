module.exports = function (app) {
    var alexarouter = require('../route/alexaRoute')();
    app.use('/api/alexa', alexarouter);
}
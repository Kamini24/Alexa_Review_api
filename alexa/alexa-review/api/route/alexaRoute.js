const alexaController = require("../controller/alexa.controller");
var router = require("express").Router();
module.exports = function () {


    // router.get('/getReview', alexa.getReview);
     router.post('/acceptReview', alexaController.acceptReview);
    //  router.post('/acceptReview', alexaController.acceptReview);
    router.get('/fetchReview', alexaController.fetchAAllreview);
    router.get('/getMOnthlyRating/:review_source', alexaController.getMonthlyRatingBystore);
    router.get('/getTotalRating/:rating', alexaController.getTotalRatingByCategory);
    return router;
}

//?reviewed_date=valueA&review_resource=valueB&rating=valueC
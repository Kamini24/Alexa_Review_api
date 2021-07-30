const alexaDA = require("../dataAccess/alexaDataAccess");
var router = require("express").Router();
module.exports = function () {



    router.post('/acceptReview', alexaDA.acceptReview);
    router.get('/fetchReview', alexaDA.fetchAAllreview);
    router.get('/getMOnthlyAvgRating/:review_source?', alexaDA.getMonthlyRatingBystore);
    router.get('/getTotalRating/:rating?', alexaDA.getTotalRatingByCategory);
    return router;
}

//?reviewed_date=valueA&review_resource=valueB&rating=valueC
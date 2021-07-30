//This is data access layer which is mainly interacting with database with ORM framework
const db = require("../config/sequalizeDBConfig");
const alexaModel = db.alexa;
const Op = db.Sequelize.Op;
const handler = require("../service/alexaReviewhandler");
const { Alexa } = require("../domain/alexaDTO");
const { sequelize } = require("../config/sequalizeDBConfig");

module.exports = {
    //accepting reviews from user in request body and submit it in file system and also in database
    acceptReview(req, res) {
        const alexa = new Alexa(req.body.review, req.body.author, req.body.review_source, req.body.rating, req.body.title, req.body.product_name, req.body.reviewed_date)
        alexaModel.create(alexa).then(data => {
            return res.status(200).send(data);

        })
            .catch(err => {
                console.error(err);
                return res.status(500).send(err);
            });
            
    },
    //this method is fetching data from db and also filters are applied , if no filters all data would be fetched
    fetchAAllreview(req, res) {
        let filters = req.query;
        let filterCondition = {
            reviewed_date: filters.reviewed_date ? filters.reviewed_date : null,
            review_source: filters.review_source ? filters.review_source : null,
            rating: filters.rating ? filters.rating : null
        }

        handler.cleanObject(filterCondition);
        console.log(`${filterCondition}`);
        alexaModel.findAll({ where: filterCondition })
            .then(data => {
                return res.status(200).send(data);
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving reviews for Alexa."
                });
            });
    },
    // this method give avg montly rating based on review_source
    getMonthlyRatingBystore(req, res) {
        let review_source = req.params.review_source;
        let paramsFilter = {
            review_source: review_source
        };

        handler.cleanObject(paramsFilter);

        let data;
        // console.log(`store_name:${store_name}`);
        alexaModel.findAll({
            attributes: ['rating'],
            where: paramsFilter
        }).then(result => {
            data = handler.monthly_avg_method(result);
            console.log(data);
            return res.status(200).send({ rating: data });

        })
            .catch(err => {
                console.error(err);
                return res.status(500).send({
                    message: "Error retrieving ratings for Alexa" || err.message
                });
            });
    },
    // this method gives total rating count present based on rating provided
    getTotalRatingByCategory(req, res) {
        let rating = req.params.rating;

        let paramsFilter = {
            rating: rating
        };

        handler.cleanObject(paramsFilter);
        alexaModel.findAll({

            where: paramsFilter,
            attributes: [[sequelize.fn("COUNT", sequelize.col('rating')), 'totalCount']]
        })
            .then(data => {
               
                return res.status(200).send({
                    rating: rating,
                    totalCount: data
                });
            })
            .catch(err => {
                console.error(error);
                return res.status(500).send({
                    message:
                        err.message || "Some error occurred getting total rating for Alexa."
                });
            });
    }
}


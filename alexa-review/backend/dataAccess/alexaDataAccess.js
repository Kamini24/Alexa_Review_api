const db = require("../config/sequalizeDBConfig");
const alexaModel = db.alexa;
const Op = db.Sequelize.Op;
const handler = require("../service/alexaReviewhandler");
const { Alexa } = require("../domain/alexaDTO");
const { sequelize } = require("../config/sequalizeDBConfig");

module.exports = {
    acceptReview(req, res) {
        const alexa = new Alexa(req.body.review, req.body.author, req.body.review_source, req.body.rating, req.body.title, req.body.product_name, req.body.reviewed_date)
        alexaModel.create(alexa).then(data => {
            return res.status(200).send(data);

        })
            .catch(err => {
                return res.status(500).send(err);
            });
    },
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
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving reviews for Alexa."
                });
            });
    },
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
                res.status(500).send({
                    message: "Error retrieving feedback for Alexa"
                });
            });
    },
    getTotalRatingByCategory(req, res) {
        let rating = req.params.rating;

        let paramsFilter = {
            rating: rating
        };

        handler.cleanObject(paramsFilter);
        alexaModel.findAll({

            where: paramsFilter,
            attributes: [[sequelize.fn("COUNT", sequelize.col('rating')), 'totalRatingCount']]
        })
            .then(data => {
                return res.status(200).send(data);
            })
            .catch(err => {
                return res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving reviews for Alexa."
                });
            });
    }
}


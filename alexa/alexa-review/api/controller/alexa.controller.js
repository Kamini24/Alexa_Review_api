const db = require("../models");
const alexaModel = db.alexa;
const Op = db.Sequelize.Op;
const fs = require("fs");
const _ = require("lodash");
const { sequelize } = require("../models");

function cleanObject(filterCondition) {
    for (let items in filterCondition) {
        if (filterCondition[items] === null || filterCondition[items] === undefined || filterCondition[items] === '') {
            delete filterCondition[items];
        }
    }
    return filterCondition;
}
const monthly_avg_method = function monthly_avg_method(result) {
    let total = _.size(result);
    let avg_montly_rating;
    let length_fivestar = _.size(_.filter(result, function (o) { return o.rating === 5 }));
    let length_fourstar = _.size(_.filter(result, function (o) { return o.rating === 4 }));
    let length_threestar = _.size(_.filter(result, function (o) { return o.rating === 3 }));
    let length_twostar = _.size(_.filter(result, function (o) { return o.rating === 2 }));
    let length_onestar = _.size(_.filter(result, function (o) { return o.rating === 1 }));
    // console.log(total);
    // console.log(length_fivestar);
    avg_montly_rating = ((length_fivestar * 5) + (length_fourstar * 4) + (length_threestar * 3) + (length_twostar * 2) + (length_onestar)) / total;
    return avg_montly_rating;
}
module.exports = {
    acceptReview(req, res) {

        if (!req.body) {

            res.status(400).send({
                message: "Content can not be empty!"
            });

        }

        let reviewObj = {
            review: req.body.review,
            author: req.body.author,
            review_source: req.body.review_source,
            rating: req.body.rating,
            title: req.body.title,
            product_name: req.body.product_name,
            reviewed_date: req.body.reviewed_date
        }

        alexaModel.create(reviewObj).then(data => {
            return res.status(200).send(data);
            // res.send("ok");
        })
            .catch(err => {
                return res.status(500).send(err);
                // .catch(err => {
                //    return res.status(500).send({
                //         message:
                //             err.message || "Some error occurred while submitting the review for Alexa!."
                //     });
                // });
            });
        },
                fetchAAllreview(req, res) {
                let filters = req.query;
                let filterCondition = {
                    reviewed_date: filters.reviewed_date ? filters.reviewed_date : null,
                    review_source: filters.review_source ? filters.review_source : null,
                    rating: filters.rating ? filters.rating : null
                }
        cleanObject(filterCondition);
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
                let store_name = req.params.review_source;
                let data;
                // console.log(`store_name:${store_name}`);
                alexaModel.findAll({
                    attributes: ['rating'],
                    where:
                        { review_source: store_name }
                }).then(async result => {
                    data = await monthly_avg_method(result);
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
                alexaModel.findAll({

                    where: { rating: rating },
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


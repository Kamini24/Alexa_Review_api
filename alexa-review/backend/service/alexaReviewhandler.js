const _ = require("lodash");
const fs= require('fs');

   function cleanObject(filterCondition) {
    for (let items in filterCondition) {
        if (filterCondition[items] === null || filterCondition[items] === undefined || filterCondition[items] === '') {
            delete filterCondition[items];
        }
    }
    return filterCondition;
     };
  function monthly_avg_method(result) {
    let total = _.size(result);
    let avg_montly_rating;
    let length_fivestar = _.size(_.filter(result, function (o) { return o.rating === 5 }));
    let length_fourstar = _.size(_.filter(result, function (o) { return o.rating === 4 }));
    let length_threestar = _.size(_.filter(result, function (o) { return o.rating === 3 }));
    let length_twostar = _.size(_.filter(result, function (o) { return o.rating === 2 }));
    let length_onestar = _.size(_.filter(result, function (o) { return o.rating === 1 }));
    avg_montly_rating = ((length_fivestar * 5) + (length_fourstar * 4) + (length_threestar * 3) + (length_twostar * 2) + (length_onestar)) / total;
    return avg_montly_rating;
};
function writingDataTofile(obj){
    let data = JSON.stringify(obj);
fs.writeFile(__dirname+'/data/alexa.json', data);
}
module.exports={cleanObject,monthly_avg_method}
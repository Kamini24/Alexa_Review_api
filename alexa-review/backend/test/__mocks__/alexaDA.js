'use strict';
const alexaDataAccess = jest.genMockFromModule('../../dataAccess/alexaDataAccess');
let Keys = Object.keys(alexaDataAccess);
Keys.forEach(k => {
    alexaDataAccess[k] = jest.fn().mockImplementation((req, res) => {
        return res.status(200).send({ testName: 'alexa.controller' })
    })
});
module.exports = alexaDataAccess;


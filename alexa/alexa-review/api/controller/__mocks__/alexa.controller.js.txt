'use strict';
const alexaController = jest.genMockFromModule('../alexa.controller');
let Keys = Object.keys(alexaController);
Keys.forEach(k => {
    alexaController[k] = jest.fn().mockImplemenation((req, res) => {
        return res.status(200).send({ testName: 'alexa.controller' })
    })
});
module.exports = alexaController;


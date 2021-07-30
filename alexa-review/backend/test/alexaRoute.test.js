'use strict'
jest.mock('../dataAccess/alexaDataAccess');
const alexaController = require('../dataAccess/alexaDataAccess');
const request = require('supertest');

describe.skip('checking access review', () => {
    let app, appUrl;
    beforeAll(() => {
        app = require('../server');
        appUrl = 'api/alexa';
    })
    jest.setTimeout(100000000);
    test('checking /acceptReview route which gets all review would be saved', async () => {
        await request(app).post(`/${appUrl}/acceptReview`).send({});
        expect(alexaController['acceptReview']).toHaveBeenCalledTimes(1);
    })
    test('checking /fetchReview route which gets all review would be saved', async () => {
        await request(app).get(`/${appUrl}/fetchReview`);
        expect(alexaController['fetchAAllreview']).toHaveBeenCalledTimes(1);
    })
    test('checking / getMOnthlyRating route which gets all review would be saved', async () => {
        await request(app).get(`/${appUrl}/getMOnthlyAvgRating/iTunes`);
        expect(alexaController['getMonthlyRatingBystore']).toHaveBeenCalledTimes(1);
    })
    test('checking / getTotalRating route which gets all review would be saved', async () => {
        await request(app).get(`/${appUrl}/getTotalRating/5`);
        expect(alexaController['getTotalRatingByCategory']).toHaveBeenCalledTimes(1);
    })
})
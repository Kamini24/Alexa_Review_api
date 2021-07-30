var rewire = require('rewire');
const alexaDA = rewire('../dataAccess/alexaDataAccess');
const mockValues = require('./common/mockValue');

describe("testing getTotalRatingByCategory test", () => {

    beforeEach(() => {

        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));
    })
    afterEach(() => {
        alexaDA.__get__('alexaModel.findAll').mockReset();
    })
    it("testing true rating value for finding total ratings based on category", async () => {
        let req = {
            params: {
                "rating": 5
            }
        }
        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ "totalRatingCount": 5 }])));

        let response = mockValues.mockResponse();

        response.send = function (args) {
            // console.log(args);
            expect(args.length) > 0;
            expect(args.totalRatingCount) == 5;
        }
        await alexaDA.getTotalRatingByCategory(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
    it("testing false rating value for finding total ratings based on category", async () => {
        let req = {
            params: {
                "rating": 0
            }
        }
        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ "totalRatingCount": 0 }])));


        let response = mockValues.mockResponse();
        response.send = function (args) {
            // console.log(args);
            expect(args.length) > 0;
            expect(args.totalRatingCount) == 0;
        }
        await alexaDA.getTotalRatingByCategory(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
    it("testing promise reject", async () => {
        let req = {
            params: {
                "rating": 0
            }
        }
        let err = "status code 500";
        let response = mockValues.mockResponse();
        response.send(status = 500);
        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getRejectPromise([err])));
        response.send = function (args) {
            expect(args.message) == 'Some error occurred while retrieving reviews for Alexa.'
        }
        await alexaDA.getTotalRatingByCategory(req, response);
        expect(response.status) == 500;

    })
})
describe("testing getMonthlyRatingBystore test", () => {
    let req = {
        params: {
            "review_source": "iTunes"
        }
    }
    beforeEach(() => {

        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));
    })
    afterEach(() => {
        alexaDA.__get__('alexaModel.findAll').mockReset();
    })
    it("testing true rating value for getMonthlyRatingBystore", async () => {
        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ "rating": 2.6666677 }])));

        let response = mockValues.mockResponse();

        response.send = function (args) {
            // console.log(args);
            expect(args.length) > 0
            expect(args.rating) == 2.6666677;
        }
        await alexaDA.getMonthlyRatingBystore(req, response);

    })
    it("testing false rating value for getMonthlyRatingBystore", async () => {
        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ "rating": 0 }])));

        let req = {
            params: {
                "review_source": "abc"
            }
        }
        let response = mockValues.mockResponse();
        response.send = function (args) {

            expect(args.length) == 0;
            expect(args.rating) == 0;

        }
        await alexaDA.getMonthlyRatingBystore(req, response);

    })
    it("testing promise reject", async () => {
        let req = {
            params: {
                "rating": 0
            }
        }
        let err = "status code 500";
        let response = mockValues.mockResponse();

        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getRejectPromise([err])));
        response.send = function (args) {
            expect(args.message) == 'Some error occurred while retrieving reviews for Alexa.'
        }
        await alexaDA.getMonthlyRatingBystore(req, response);


    })
})
describe("testing fetch Review", () => {
    let obj =
    {
        "review": "Pero deberia de poder cambiarle el idioma a alexa",
        "author": "WarcryxD",
        "review_source": "iTunes",
        "rating": 4,
        "title": "Excelente",
        "product_name": "Amazon Alexa",
        "reviewed_date": "2018-01-12T02:27:03.000Z"
    }
    let req = {};
    beforeEach(() => {

        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));
    })
    afterEach(() => {
        alexaDA.__get__('alexaModel.findAll').mockReset();
    })
    it("testing true rating value for filters", async () => {
        req.query = {
            "reviewed_date": "2017-12-09",
            "review_source": "iTunes",
            "rating": 4
        }
        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([obj])));

        let response = mockValues.mockResponse();

        response.send = function (args) {

            expect(args.length) > 0;
            expect(args.obj.rating) == 4;
            expect(args.obj.author) == 'WarcryxD';
            expect(args.obj.title) == 'Excelente';

        }
        await alexaDA.fetchAAllreview(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
    it("testing false value", async () => {
        let obj = null;
        req.query = {};

        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([obj])));

        let response = mockValues.mockResponse();
        response.send = function (args) {
            expect(args.length) == 0;
            expect(args) == null
        }
        await alexaDA.fetchAAllreview(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
    it("testing promise reject", async () => {
        req.query = {};
        let err = "status code 500";
        let response = mockValues.mockResponse();

        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getRejectPromise([err])));
        response.send = function (args) {
            expect(args.message) == 'Some error occurred while retrieving reviews for Alexa.'
        }
        await alexaDA.fetchAAllreview(req, response);


    })

})
describe("testing accept review test", () => {

    beforeEach(() => {

        alexaDA.__set__('alexaModel.create', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));
    })
    afterEach(() => {
        alexaDA.__get__('alexaModel.create').mockReset();
    })
    it("testing true rating value for Accept Review", async () => {
        let obj =
        {
            "review": "Pero deberia de poder cambiarle el idioma a alexa",
            "author": "WarcryxD",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excelente",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2018-01-12T02:27:03.000Z"
        }
        let req = {};
        req.body = obj;
        alexaDA.__set__('alexaModel.create', jest.fn().mockReturnValue(mockValues.getResolvePromise([obj])));

        let response = mockValues.mockResponse();

        response.send = function (args) {

            expect(args.length) == 1;
            expect(args.author) == 'WarcryxD'
            expect(args.title) == 'Excelente'
            expect(args.rating) == 4
        }
        await alexaDA.acceptReview(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
    it("testing false rating value for Accept Review", async () => {
        let obj =
        {
            "review": null,
            "author": null,
            "review_source": null,
            "rating": null,
            "title": null,
            "product_name": null,
            "reviewed_date": null
        }
        let req = {};
        req.body = obj;
        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([obj])));

        let response = mockValues.mockResponse();
        response.send = function (args) {
            expect(args.length) == 1;
            expect(args.author) == null
            expect(args.title) == null
            expect(args.rating) == null

        }
        await alexaDA.acceptReview(req, response);

    })
    it("testing promise reject", async () => {
        let obj =
        {
            "review": null,
            "author": null,
            "review_source": null,
            "rating": null,
            "title": null,
            "product_name": null,
            "reviewed_date": null
        }
        let req = {}
        req.body = obj
        let err = "status code 500";
        let response = mockValues.mockResponse();

        alexaDA.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getRejectPromise([err])));
        response.send = function (args) {
            expect(args.message) == 'Some error occurred while retrieving reviews for Alexa.'
        }
        await alexaDA.acceptReview(req, response);
    })
})
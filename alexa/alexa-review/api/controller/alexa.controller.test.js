var rewire = require('rewire');
const alexaController = rewire('./alexa.controller');
const mockValues = require('../test/mockValue');

describe("testing getTotalRatingByCategory test", () => {

    beforeEach(() => {

        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));
    })
    afterEach(() => {
        alexaController.__get__('alexaModel.findAll').mockReset();
    })
    it("testing true rating value for finding total ratings based on category", async () => {
        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ "totalRatingCount": "5" }])));
        let req = {
            params: {
                "rating": 5
            }
        }
        let response = mockValues.mockResponse();

        response.send = function (args) {

            expect(args).not.toBeNull();
            expect(args.length).toBeGreaterThan(1);
        }
        await alexaController.getTotalRatingByCategory(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
    it("testing false rating value for finding total ratings based on category", async () => {
        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));

        let req = {
            params: {
                "rating": 0
            }
        }
        let response = mockValues.mockResponse();
        response.send = function (args) {

            expect(args).toBeNull();
            expect(args.length).toEqual(0);
        }
        await alexaController.getTotalRatingByCategory(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
    // it("returns errors if DB fails", async () => {
    //     alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getRejectPromise("error")));
    //     let req = {
    //         params: {
    //             "rating": 0
    //         }
    //     }
    //     let response = mockValues.mockResponse();
    //     let data = await alexaController.getTotalRatingByCategory(req, response);
    //     expect(data).toEqual("error");

    // })


})
describe("testing getMonthlyRatingBystore test", () => {
    let req = {
        params: {
            "review_source": "iTunes"
        }
    }
    beforeEach(() => {

        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));
    })
    afterEach(() => {
        alexaController.__get__('alexaModel.findAll').mockReset();
    })
    it("testing true rating value for getMonthlyRatingBystore", async () => {
        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ "rating": 2.6666677 }])));

        let response = mockValues.mockResponse();

        response.send = function (args) {
            // console.log(args);
            expect(args).not.toBeNull();
            expect(args.rating).toBeGreaterThan(0);
        }
        await alexaController.getMonthlyRatingBystore(req, response);

    })
    it("testing false rating value for getMonthlyRatingBystore", async () => {
        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ "rating": "abc" }])));

        let req = {
            params: {
                "review_source": "abc"
            }
        }
        let response = mockValues.mockResponse();
        response.send = function (args) {
             console.log(args);
            expect(args).toBeNull();
            expect(args.length).toEqual(0);
            expect(args.rating.length).toEqual(1);
        }
        await alexaController.getMonthlyRatingBystore(req, response);

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

        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));
    })
    afterEach(() => {
        alexaController.__get__('alexaModel.findAll').mockReset();
    })
    it("testing true rating value for filters", async () => {
        req.query = {
            "reviewed_date": "2017-12-09",
            "review_source": "iTunes",
            "rating": 4
        }
        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ obj }])));

        let response = mockValues.mockResponse();

        response.send = function (args) {

            expect(args).not.toBeNull();
            expect(args.length).toBeGreaterThan(1);
        }
        await alexaController.fetchAAllreview(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
    it("testing false value", async () => {
        let obj = null;
        req.query = {};

        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([obj])));

        let response = mockValues.mockResponse();
        response.send = function (args) {

            expect(args).toBeNull();
            expect(args.length).toEqual(0);
        }
        await alexaController.fetchAAllreview(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
    })
})
describe("testing accept review test", () => {

    beforeEach(() => {

        alexaController.__set__('alexaModel.create', jest.fn().mockReturnValue(mockValues.getResolvePromise([])));
    })
    afterEach(() => {
        alexaController.__get__('alexaModel.create').mockReset();
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
        alexaController.__set__('alexaModel.create', jest.fn().mockReturnValue(mockValues.getResolvePromise([{ obj }])));

        let response = mockValues.mockResponse();

        response.send = function (args) {

            expect(args).toBeDefined();
            expect(args.author).not.toBeNull();
            expect(args.title).not.toBeNull();
            expect(args.rating).not.toBeNull();
        }
        await alexaController.acceptReview(req, response);
        expect(response.status).toHaveBeenCalledWith(201);
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
        alexaController.__set__('alexaModel.findAll', jest.fn().mockReturnValue(mockValues.getResolvePromise([obj])));

        let response = mockValues.mockResponse();
        response.send = function (args) {
            // console.log(args);
            expect(args).toBeNull();
          
        }
        await alexaController.acceptReview(req, response);

    })
})
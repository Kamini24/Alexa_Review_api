mockUse = jest.fn((name, module) => true)

const app = {
    use: mockUse
};
describe("Alexa Route", () => {
    it("should add modules routes to app", () => {
        var routes = require("../config/routeConfig")(app);
        expect(mockUse.mock.calls[0][0]).toBe('/api/alexa');
    })
})
const mockResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.send = jest.fn().mockReturnValue(response);
    response.setHeader = jest.fn();
    return response;
};
function getRejectPromise(err) {
    return new Promise((resolve, reject) => {
        reject(err);
    })
}

function getResolvePromise(obj) {
    return new Promise((resolve, reject) => {
        resolve(obj);
    })
}
module.exports = {
    getRejectPromise,
    getResolvePromise,
    mockResponse
}
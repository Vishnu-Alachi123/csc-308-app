const myFunctions = require('./tdd.js');

test('Testing createPortfolio -- success', () => {
    const target = {};
    const result = myFunctions.createPortfolio();
    expect(target).toEqual(result);
});

test('Testing checkEmpty (no shares) -- success', () => {
    const target = true;
    const portfolio = myFunctions.createPortfolio();
    const result = myFunctions.checkEmpty(portfolio);
    expect(target).toEqual(result);
})

test('Testing checkEmpty (not empty) -- success', () => {
    const target = false;
    const portfolio = {"NVD": 2};
    const result = myFunctions.checkEmpty(portfolio);
    expect(target).toEqual(result);
})

test('Testing buyShares () -- success', () => {
    const target = {"NVD":2};
    const portfolio = myFunctions.createPortfolio();
    const result = myFunctions.buyShares(portfolio,"NVD",2);
    expect(target).toEqual(result);
})

test('Testing buyShares (empty) -- success', () => {
    const expectedError = "Missing Argument";
    expect(() => myFunctions.buyShares()).toThrow(expectedError);
});

test('Testing buyShares () buy more shares -- success', () => {
    const target = {"NVD":4};
    const portfolio = myFunctions.createPortfolio({"NVD": 2});
    const result = myFunctions.buyShares(portfolio,"NVD", 2);
    expect(target).toEqual(result);
})

test('Testing sellShares () -- success', () => {
    const target = {"NVD": 1};
    const portfolio = myFunctions.createPortfolio();
    myFunctions.buyShares(portfolio, "NVD", 2)
    const result = myFunctions.sellShares(portfolio,"NVD", 1);
    expect(target).toEqual(result);
})

test('Testing sellShares () sell all shares -- success', () => {
    const target = {};
    const portfolio = myFunctions.createPortfolio();
    myFunctions.buyShares(portfolio, "NVD", 2)
    const result = myFunctions.sellShares(portfolio,"NVD", 2);
    expect(target).toEqual(result);
})

test('Testing sellShares () sell more shares than exist -- success', () => {
    const expectedError = 'Not possible to sell this number of shares.';
    const portfolio = myFunctions.createPortfolio();
    myFunctions.buyShares(portfolio, "NVD", 1)
    expect(() => myFunctions.sellShares(portfolio, "NVD", 2)).toThrow(expectedError);
})


test('Testing stockCount ()  -- success', () => {
    const target = 3;
    const portfolio = myFunctions.createPortfolio({"NVD":2, "MRS": 4, "RBX": 1});
    const result = myFunctions.stockCount(portfolio,"NVD");
    expect(target).toEqual(result)
})

test('Testing stockCount () empty -- success', () => {
    const target = 0;
    const portfolio = myFunctions.createPortfolio({"NVD":2});
    myFunctions.sellShares(portfolio, "NVD", 2);
    const result = myFunctions.stockCount(portfolio,"NVD");
    expect(target).toEqual(result)
})

test('Testing createPortfolio() Stock with no shares -- success', () => {
    const target = {};
    const result = myFunctions.createPortfolio({"NVD":0});
    expect(target).toEqual(result)
})


test('Testing shareCount() -- success', () => {
    const target = 2;
    const portfolio = myFunctions.createPortfolio({"NVD":2, "MRS": 4, "RBX": 1});
    const result = myFunctions.shareCount(portfolio, "NVD");
    expect(target).toEqual(result)
})


test('Testing shareCount() non-existent stock-- success', () => {
    const target = 0;
    const portfolio = myFunctions.createPortfolio({"NVD":2, "MRS": 4, "RBX": 1});
    const result = myFunctions.shareCount(portfolio, "BLT");
    expect(target).toEqual(result)
})

// REFLECTION

// I was able to follow the TDD process, I found it made it easier 
// to write the Functions. By writing the tests first, I was able to 
// understand the requirements, and the different edge cases before I 
// wrote the function. This allowed me to write the function without needing
// to go back and change it to work for the edge cases.
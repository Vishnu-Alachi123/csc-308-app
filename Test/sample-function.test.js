const myFunctions = require('./sample-functions.js');

// ------ Test for containsNumber -----------
test('Testing containNumbers (No Number) -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("abcdef");
    expect(target).toBe(result);
});
test('Testing containNumbers (Number) -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers("abc3def");
    expect(target).toBe(result);
});
test('Testing containNumbers (Special Characters) -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("abc/@#def");
    expect(target).toBe(result);
});
test('Testing containNumbers (Spaces in string) -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("abc def");
    expect(target).toBe(result);
    // Test fails as function returns true when there is a space in the string
});
test('Testing containNumbers (Empty string) -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("");
    expect(target).toBe(result);
});

// -------- Test for div function --------
test('Testing div (basic division) -- success', () => {
const target = 2;
const result = myFunctions.div(4,2);
expect(target).toBe(result);
});
test('Testing div (Divide by 0) -- success', () => {
const target = Infinity;
const result = myFunctions.div(4,0);
expect(target).toBe(result);
});
test('Testing div(divide 0) -- success', () => {
const target = 0;
const result = myFunctions.div(0,2);
expect(target).toBe(result);
});
test('Testing div(0 divided by 0) -- success', () => {
const target = NaN;
const result = myFunctions.div(0,0);
expect(target).toBe(result);
});
import { deleteLastObjectProperty as d } from "./delete";

var emptyObject = {};
var testObject = { prop: 'val' }

describe('delLastObjItem', () => {
    describe('arg length', () => {
        var thisTestObject;
        beforeEach(() => {
            thisTestObject = {...testObject}
        })
        test('2 args => ERROR', () => {
            expect(() => d(thisTestObject, 'spam')).not.toThrow();
        })
        test('1 arg => ERROR', () => {
            expect(() => d(thisTestObject)).not.toThrow();
        });
        test('0 args => ERROR', () => {
            expect(() => d()).toThrow();
        });
    })
    describe('"obj" argument type checking', () => {
        test('obj => SUCCESS', () => {
            expect(() => d({})).not.toThrow();
        });
        test('arr => ERROR', () => {
            expect(() => d([])).toThrow();
        });
        test('number => ERROR', () => {
            expect(() => d(1)).toThrow();
        });
        test('boolean => ERROR', () => {
            expect(() => d(true)).toThrow();
        });
        test('string => ERROR', () => {
            expect(() => d('spam')).toThrow();
        });
    });
    describe('"obj" contents', () => {
        test('object w/ 1 property => SUCCESS', () => {
            var thisTestObject = {...testObject};
            expect(d(thisTestObject)).toMatchObject({});
        });
        test('object w/ 0 properties => SUCCESS', () => {
            var thisTestObject = {...emptyObject};
            expect(d(thisTestObject)).toMatchObject({});
        });
    })
});

import { pop } from "./delete";

var testObject = { prop: 'val' };
var emptyObject = {};
var testArray = ['onlyitem'];
var emptyArray = [];

describe('pop', () => {
    describe('arg length', () => {
        var thisTestObject;
        beforeEach(() => {
            thisTestObject = {...testObject}
        })
        test('2 args => ERROR', () => {
            expect(() => pop(thisTestObject, 'spam')).not.toThrow();
        })
        test('1 arg => SUCCESS', () => {
            expect(() => pop(thisTestObject)).not.toThrow();
        });
        test('0 args => ERROR', () => {
            expect(() => pop()).toThrow();
        });
    })
    describe('"obj" argument type checking', () => {
        test('obj => SUCCESS', () => {
            expect(() => pop({})).not.toThrow();
        });
        test('arr => SUCCESS', () => {
            expect(() => pop([])).not.toThrow();
        });
        test('number => ERROR', () => {
            expect(() => pop(1)).toThrow();
        });
        test('boolean => ERROR', () => {
            expect(() => pop(true)).toThrow();
        });
        test('string => ERROR', () => {
            expect(() => pop('spam')).toThrow();
        });
    });
    describe('functionality', () => {
        describe('objects', () => {
            var expected = {};
            test('object w/ 1 property => object w/ 0 properties', () => {
                var thisTestObject = {...testObject};
                expect(pop(thisTestObject)).toMatchObject(expected);
            });
            test('object w/ 0 properties => object w/ 0 properties', () => {
                var thisTestObject = {...emptyObject};
                expect(pop(thisTestObject)).toMatchObject(expected);
            });
        });
        describe('arrays', () => {
            var expected = [];
            test('array w/ 1 element => array w/ 0 elements', () => {
                var thisTestArray = [...testArray];
                console.log(thisTestArray)
                expect(pop(thisTestArray)).toEqual(expect.arrayContaining(expected));
            });
            test('array w/ 0 elements => array w/ 0 elements', () => {
                var thisTestArray = [...emptyArray];
                expect(pop(thisTestArray)).toEqual(expect.arrayContaining(expected));
            });
        });
    });
});

import {getUpdatedObject, getBoundPropertyUpdater} from './get'
import { pop } from '../delete/delete';

const getArgs = () => ([
    {testProperty: 'testValue'},
    'testProperty', 
    'newValue'
])

describe('getUpdatedObject', () => {
    var f = getUpdatedObject;
    describe('argument length', () => {
        var args = getArgs();
        beforeEach(() => {
            if (args.length < 3) {
                args.pop();
            }
        })
        test('arguments.length === 3 => SUCCESS', () => {
            expect(() => f(...args)).not.toThrow();
        });
        test('arguments.length === 2 => SUCCESS', () => {
            expect(() => f(...args)).not.toThrow();
        });
        test('arguments.length === 1 => SUCCESS', () => {
            expect(() => f(...args)).not.toThrow();
        });
        test('arguments.length === 0 => SUCCESS', () => {
            expect(() => f(...args)).not.toThrow();
        });
    });
    describe('"tObj" type-checking', () => {
        var defaultArgs = getArgs();
        var args;
        beforeEach(() => {
            args = [...defaultArgs];
        })
        test('obj => SUCCESS', () => {
            args[0] = {};
            expect(() => f(...args)).not.toThrow();
        });
        test('arr => SUCCESS', () => {
            args[0] = [];
            expect(() => f(...args)).not.toThrow();
        });
        test('number => ERROR', () => {
            args[0] = 1;
            expect(() => f(...args)).toThrow();
        });
        test('boolean => ERROR', () => {
            args[0] = true;
            expect(() => f(...args)).toThrow();
        });
        test('string => ERROR', () => {
            args[0] = 'spam';
            expect(() => f(...args)).toThrow();
        });
    });
    describe('"tProp" 2 type-checking', () => {
        var defaultArgs = getArgs();
        var args;
        beforeEach(() => {
            args = [...defaultArgs];
        })
        test('string => SUCCESS', () => {
            args[1] = 'spam';
            expect(() => f(...args)).not.toThrow();
        });
        test('obj => ERROR', () => {
            args[1] = {};
            expect(() => f(...args)).toThrow();
        });
        test('arr => ERROR', () => {
            args[1] = [];
            expect(() => f(...args)).toThrow();
        });
        test('number => ERROR', () => {
            args[1] = 1;
            expect(() => f(...args)).toThrow();
        });
        test('boolean => ERROR', () => {
            args[1] = true;
            expect(() => f(...args)).toThrow();
        });
    });
    describe('functionality', () => {
        var defaultArgs = getArgs();
        var args;
        var insufficientArgsExpected = { "testProperty": "testValue" };
        var sufficientArgsExpected = { "testProperty" : "newValue" }
        beforeEach(() => {
            args = [...defaultArgs];
        })
        test('1 valid arg => copy of obj', () => {
            args.splice(1);
            expect(f(...args)).toMatchObject(insufficientArgsExpected);
        });
        test('2 valid args => copy of obj', () => {
            args.splice(2);
            expect(f(...args)).toMatchObject(insufficientArgsExpected);
        });
        test('3 valid args => copy of obj w/ updated property value', () => {
            expect(f(...args)).toMatchObject(sufficientArgsExpected);
        });
    });
});

describe('getBoundPropertyUpdater', () => {
    var f = getBoundPropertyUpdater;
    var testObj = { "testProperty": "oldValue" };
    var testProperty = "testProperty";
    describe('argument length', () => {
        test('2 arguments => SUCCESS', () => {
            expect(() => f(testObj, testProperty)).not.toThrow();
        });
        test('1 argument => ERROR', () => {
            expect(() => f(testObj)).toThrow();
        });
        test('0 arguments => ERROR', () => {
            expect(() => f()).toThrow();
        });
    });
    describe('"obj" type-checking', () => {
        var args = [{}, 'testProperty'];
        afterEach(() => {
            // reset to default
            args[0] = {};
        })
        test('obj => SUCCESS', () => {
            expect(() => f(...args)).not.toThrow();
        });
        test('arr => ERROR', () => {
            args[0] = [];
            expect(() => f(...args)).toThrow();
        });
        test('number => ERROR', () => {
            args[0] = 1;
            expect(() => f(...args)).toThrow();
        });
        test('boolean => ERROR', () => {
            args[0] = true;
            expect(() => f(...args)).toThrow();
        });
        test('string => ERROR', () => {
            args[0] = 'spam';
            expect(() => f(...args)).toThrow();
        });
    });
    describe('"prop" type-checking', () => {
        var testProperty = 'testProperty';
        var args = [{}, testProperty];
        afterEach(() => {
            // reset to default
            args[1] = testProperty;
        })
        test('string => SUCCESS', () => {
            expect(() => f(...args)).not.toThrow();
        });
        test('obj => ERROR', () => {
            args[1] = {};
            expect(() => f(...args)).toThrow();
        });
        test('arr => ERROR', () => {
            args[1] = [];
            expect(() => f(...args)).toThrow();
        });
        test('number => ERROR', () => {
            args[1] = 1;
            expect(() => f(...args)).toThrow();
        });
        test('boolean => ERROR', () => {
            args[1] = true;
            expect(() => f(...args)).toThrow();
        });
    });
    describe('return value', () => {
        test('returns a function', () => {
            expect(typeof f(testObj, testProperty)).toMatch('function')
        });
    });
});
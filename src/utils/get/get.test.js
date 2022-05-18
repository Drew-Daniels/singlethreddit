import {getUpdatedObject as guo, getBoundObjectUpdater as gbou} from './get'
import { pop } from '../delete/delete';

const getArgs = () => ([
    {testProperty: 'testValue'},
    'testProperty', 
    'newValue'
])

describe('getUpdatedObject', () => {
    describe('argument length', () => {
        var args = getArgs();
        beforeEach(() => {
            if (args.length < 3) {
                args.pop();
            }
        })
        test('arguments.length === 3 => SUCCESS', () => {
            expect(() => guo(...args)).not.toThrow();
        });
        test('arguments.length === 2 => SUCCESS', () => {
            expect(() => guo(...args)).not.toThrow();
        });
        test('arguments.length === 1 => SUCCESS', () => {
            expect(() => guo(...args)).not.toThrow();
        });
        test('arguments.length === 0 => SUCCESS', () => {
            expect(() => guo(...args)).not.toThrow();
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
            expect(() => guo(...args)).not.toThrow();
        });
        test('arr => SUCCESS', () => {
            args[0] = [];
            expect(() => guo(...args)).not.toThrow();
        });
        test('number => ERROR', () => {
            args[0] = 1;
            expect(() => guo(...args)).toThrow();
        });
        test('boolean => ERROR', () => {
            args[0] = true;
            expect(() => guo(...args)).toThrow();
        });
        test('string => ERROR', () => {
            args[0] = 'spam';
            expect(() => guo(...args)).toThrow();
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
            expect(() => guo(...args)).not.toThrow();
        });
        test('obj => ERROR', () => {
            args[1] = {};
            expect(() => guo(...args)).toThrow();
        });
        test('arr => ERROR', () => {
            args[1] = [];
            expect(() => guo(...args)).toThrow();
        });
        test('number => ERROR', () => {
            args[1] = 1;
            expect(() => guo(...args)).toThrow();
        });
        test('boolean => ERROR', () => {
            args[1] = true;
            expect(() => guo(...args)).toThrow();
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
            expect(guo(...args)).toMatchObject(insufficientArgsExpected);
        });
        test('2 valid args => copy of obj', () => {
            args.splice(2);
            expect(guo(...args)).toMatchObject(insufficientArgsExpected);
        });
        test('3 valid args => copy of obj w/ updated property value', () => {
            expect(guo(...args)).toMatchObject(sufficientArgsExpected);
        });
    });
});

describe('getBoundObjectUpdater', () => {
    var testObj = { "testProperty": "oldValue" };
    var testProperty = "testProperty";
    describe('argument length', () => {
        test('2 arguments => SUCCESS', () => {
            expect(() => gbou(testObj, testProperty)).not.toThrow();
        });
        test('1 argument => ERROR', () => {
            expect(() => gbou(testObj)).toThrow();
        });
        test('0 arguments => ERROR', () => {
            expect(() => gbou()).toThrow();
        });
    });
    describe('"tObj" type-checking', () => {
        test('obj => SUCCESS', () => {

        });
        test('arr => ERROR', () => {

        });
        test('number => ERROR', () => {

        });
        test('boolean => ERROR', () => {

        });
        test('string => ERROR', () => {

        });
    });
    describe('"tProp" 2 type-checking', () => {
        test.todo('string => SUCCESS');
        test.todo('obj => ERROR');
        test.todo('arr => ERROR');
        test.todo('number => ERROR');
        test.todo('boolean => ERROR');
    });
    describe('"tVal" 3 type-checking', () => {
        test.todo('string => SUCCESS');
        test.todo('obj => ERROR');
        test.todo('arr => ERROR');
        test.todo('number => ERROR');
        test.todo('boolean => ERROR');
    });    
    describe('functionality', () => {

    });
});
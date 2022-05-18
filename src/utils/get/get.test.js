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
        test('obj => SUCCESS', () => {
            var args = [...defaultArgs]
            args[0] = {};
            expect(() => guo(...args)).not.toThrow();
        });
        test('arr => SUCCESS', () => {
            var args = [...defaultArgs]
            args[0] = [];
            expect(() => guo(...args)).not.toThrow();
        });
        test('number => ERROR', () => {
            var args = [...defaultArgs]
            args[0] = 1;
            expect(() => guo(...args)).toThrow();
        });
        test('boolean => ERROR', () => {
            var args = [...defaultArgs]
            args[0] = true;
            expect(() => guo(...args)).toThrow();
        });
        test('string => ERROR', () => {
            var args = [...defaultArgs]
            args[0] = 'spam';
            expect(() => guo(...args)).toThrow();
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
});

describe('getBoundObjectUpdater', () => {

    describe('argument length', () => {

    });
    
    describe('"tObj" type-checking', () => {
        test.todo('obj => SUCCESS');
        test.todo('arr => ERROR');
        test.todo('number => ERROR');
        test.todo('boolean => ERROR');
        test.todo('string => ERROR');
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

});
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
                pop(args);
            }
        });
        test('arguments.length === 3 => SUCCESS', () => {
            expect(() => guo(...config)).not.toThrow();
        });
        test('arguments.length === 2 => SUCCESS', () => {
            expect(() => guo(config)).not.toThrow();
        });
        test('arguments.length === 1 => SUCCESS', () => {
            expect(() => guo(config)).not.toThrow();
        });
        test('arguments.length === 0 => SUCCESS', () => {
            expect(() => guo(config)).not.toThrow();
        });
    });
    
    describe('"tObj" type-checking', () => {
        var config = getConfig();
        test('obj => SUCCESS', () => {
            expect(() => guo({})).not.toThrow();
        });
        test('arr => ERROR', () => {
            expect(() => guo([])).toThrow();
        });
        test('number => ERROR', () => {
            expect(() => guo(1)).toThrow();
        });
        test('boolean => ERROR', () => {
            expect(() => guo(true)).toThrow();
        });
        test('string => ERROR', () => {
            expect(() => guo('spam')).toThrow();
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
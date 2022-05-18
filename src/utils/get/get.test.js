import {getUpdatedObj as guo} from './get'
import { deleteLastObjectItem } from '../delete/delete';

var defaultArgs = [
    {testProperty: 'testValue'},
    'testProperty', 
    'newValue'
];

const getConfig = () => defaultArgs;

describe('argument length', () => {
    var config = getConfig();
    beforeEach(() => {
        if (!config.length === 3) {
            deleteLastObjectItem(config);
        }
    });
    test('arguments.length === 3 => SUCCESS', () => {
        expect(() => guo(config)).not.toThrow();
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

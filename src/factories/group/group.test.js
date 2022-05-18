import Group from './group';
import {getUpdatedObject} from '../../utils/get/get';

var defaultConfig = {
    // REQUIRED - no default arguments provided
    name: 'fakegroup',
    description: 'We are a fake group',
    // default args...
}

/**
 * Returns a copy of the default configuration object with updated key-value pair if provided as args.
 * If no arguments are provided, a copy of the default configuration is returned.
 * @param {string} tProperty 
 * @param {any} tValue 
 * @returns [Config object]
 */
 var getTestConfig = getUpdatedObject.bind(null, defaultConfig);

describe('REQUIRED parameters', () => {
    
    describe('baseName', () => {
        test.todo('non-blank string => SUCCESS');
        test.todo('blank string => ERROR');
        test.todo('number => ERROR');
        test.todo('boolean => ERROR');
        test.todo('explicit (passed) undefined => ERROR');
        test.todo('implicit (not passed) undefined => ERROR');
    });
    describe('displayName', () => {
        test.todo('non-blank string => SUCCESS');
        test.todo('blank string => ERROR');
        test.todo('number => ERROR');
        test.todo('boolean => ERROR');
        test.todo('explicit (passed) undefined => ERROR');
        test.todo('implicit (not passed) undefined => ERROR');
    });
    describe('description', () => {
        test.todo('non-blank string => SUCCESS');
        test.todo('blank string => ERROR');
        test.todo('number => ERROR');
        test.todo('boolean => ERROR');
        test.todo('explicit (passed) undefined => ERROR');
        test.todo('implicit (not passed) undefined => ERROR');
    });
});

describe('OPTIONAL parameters', () => {
    describe('timeCreated', () => {
        test.todo('int > 0 => SUCCESS');
        test.todo('0 => ERROR');
        test.todo('int < 0 => ERROR');
        test.todo('string => ERROR');
        test.todo('boolean => ERROR');
        test.todo('object => ERROR');
    });
    describe('members', () => {
        test.todo('array => SUCCESS');
        test.todo('explicit (passed) undefined => SUCCESS');
        test.todo('implicit (not passed) undefined => SUCCESS');
        test.todo('int => ERROR');
        test.todo('string => ERROR');
        test.todo('boolean => ERROR');
    });
});
import Group from './group';
import {getBoundPropertyUpdater} from '../../utils/get/get';
import { MIN_TIMESTAMP } from '../../constants';

var defaultConfig = {
    // REQUIRED - no default arguments provided
    baseName: 'fakegroup',
    displayName: 'Fake Group',
    description: 'We are a fake group',
    // default args...
}

/**
 * Returns an updater function that will be used to update specific property on a copy of the default config
 * @param {string} tProperty 
 * @returns [function]
 */
 function getPropUpdater(tProperty) {
    return getBoundPropertyUpdater(defaultConfig, tProperty);
}

describe('REQUIRED parameters', () => {
    describe('baseName', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'baseName';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(Group(config)).toMatchObject({ baseName: tValue });
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('number => ERROR', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('boolean => ERROR', () => {
            var tValue = true;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(() => Group(config)).toThrow();
        });
    });
    describe('displayName', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'displayName';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(Group(config)).toMatchObject({ displayName: tValue });
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('number => ERROR', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('boolean => ERROR', () => {
            var tValue = true;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(() => Group(config)).toThrow();
        });
    });
    describe('description', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'description';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(Group(config)).toMatchObject({ description: tValue });
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('number => ERROR', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('boolean => ERROR', () => {
            var tValue = true;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(() => Group(config)).toThrow();
        });
    });
});

describe('OPTIONAL parameters', () => {
    describe('timeCreated', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'timeCreated';
            getUpdatedConfig = getPropUpdater(tProperty);
        })
        test('int > MIN_TIMESTAMP => SUCCESS', () => {
            var tValue = MIN_TIMESTAMP + 1;
            var config = getUpdatedConfig(tValue);
            // TODO: update this test to ensure that the timeCreated is greater than MIN_TIMESTAMP
            expect(Group(config)).toMatchObject({ timeCreated: expect.any(Number) });
        });
        test('int === MIN_TIMESTAMP => ERROR', () => {
            var tValue = MIN_TIMESTAMP;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('int < MIN_TIMESTAMP => ERROR', () => {
            var tValue = MIN_TIMESTAMP - 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('string => ERROR', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('boolean => ERROR', () => {
            var tValue = true;
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
        test('object => ERROR', () => {
            var tValue = {};
            var config = getUpdatedConfig(tValue);
            expect(() => Group(config)).toThrow();
        });
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
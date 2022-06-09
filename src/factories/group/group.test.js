import Group from './group';
import {getBoundPropertyUpdater} from '../../utils/get/get';
import { Timestamp } from 'firebase/firestore';

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
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            // TODO: update this test to ensure that the timeCreated is greater than MIN_TIMESTAMP
            expect(Group(config)[tProperty]).toBeInstanceOf(Timestamp);
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            // TODO: update this test to ensure that the timeCreated is greater than MIN_TIMESTAMP
            expect(Group(config)[tProperty]).toBeInstanceOf(Timestamp);
        });
        test('int => ERROR', () => {
            var tValue = 1;
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
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'members';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('array => SUCCESS', () => {
            var tValue = [];
            var config = getUpdatedConfig(tValue);
            expect(Group(config)).toMatchObject({ members: [] });
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Group(config)).toMatchObject({ members: [] });
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(Group(config)).toMatchObject({ members: [] });
        });
        test('int => ERROR', () => {
            var tValue = 1;
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
    });
    describe('rules', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'rules';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('array => SUCCESS', () => {
            var tValue = [];
            var config = getUpdatedConfig(tValue);
            expect(Group(config)).toMatchObject({ rules: [] });
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Group(config)).toMatchObject({ rules: [] });
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(Group(config)).toMatchObject({ rules: [] });
        });
        test('int => ERROR', () => {
            var tValue = 1;
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
    });
});
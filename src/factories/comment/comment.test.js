import 'dotenv/config';
import Comment from './comment';
import {getBoundPropertyUpdater} from '../../utils/get/get';
import { Timestamp } from 'firebase/firestore';

var defaultConfig = {
    // REQUIRED - no default arguments provided
    uid: '123spam',
    userName: 'Fake User',
    baseName: 'fakegroup',
    body: 'This will be a comment body',
    // default args...
};
/**
 * Returns an updater function that will be used to update specific property on a copy of the default config
 * @param {string} tProperty 
 * @returns [function]
 */
function getPropUpdater(tProperty) {
    return getBoundPropertyUpdater(defaultConfig, tProperty);
}

describe('REQUIRED parameters', () => {
    describe('uid', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'uid';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'Not a real person';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ uid: tValue });
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(() => Comment(config)).toThrow();
        });
    });
    describe('userName', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'userName';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'Not a real person';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ userName: tValue });
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(() => Comment(config)).toThrow();
        });
    });
    describe('baseName', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'baseName';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue= 'spam';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ baseName : tValue });
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(() => Comment(config)).toThrow();
        });
    });
    describe('body', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'body';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ body: tValue });
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = getUpdatedConfig();
            delete config[tProperty];
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
    });
});

describe('OPTIONAL parameters', () => {
    describe('parentId', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'parentId';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('blank string => SUCCESS', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject(config);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'iamauniqueparentid';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ parentId: tValue });
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = {...defaultConfig};
            delete config[tProperty];
            expect(Comment(config)).toMatchObject({ parentId: '' });
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ parentId: '' });
        });
        test('number 0 => ERROR', () => {
            var tValue = 0;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('number 1 => ERROR', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('boolean true => ERROR', () => {
            var tValue = true;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();        
        })
        test('boolean false => ERROR', () => {
            var tValue = false;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        })
    });
    describe('timeCreated', () => {
        var tProperty;
        var getUpdatedConfig
        beforeAll(() => {
            tProperty = 'timeCreated';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('Timestamp => SUCCESS', () => {
            var tValue = Timestamp.now();
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ timeCreated: tValue });
        })
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getUpdatedConfig();
            delete config[tProperty];
            expect(Comment(config)[tProperty]).toBeInstanceOf(Timestamp);
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)[tProperty]).toBeInstanceOf(Timestamp);
        });
        test('int => ERROR', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        })
        // TODO: Remove this test? Unnecessary if we are checking against MIN_TIMESTAMP
        test('0 => ERROR', () => {
            var tValue = 0;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
    });
    
    describe('timeEdited', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'timeEdited';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('Timestamp => SUCCESS', () => {
            var tValue = Timestamp.now();
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ timeEdited: tValue });
        })
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getUpdatedConfig();
            delete config[tProperty];
            // TODO: update this test to ensure that the timeEdited is greater than MIN_TIMESTAMP
            expect(Comment(config)[tProperty]).toBeInstanceOf(Timestamp);
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            // TODO: update this test to ensure that the timeEdited is greater than MIN_TIMESTAMP
            expect(Comment(config)[tProperty]).toBeInstanceOf(Timestamp);
        });
        test('int => ERROR', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        })
        test('0 => ERROR', () => {
            var tValue = 0;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
    });
    describe('upvoters', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'upvoters';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('[] => SUCCESS', () => {
            var tValue = [];
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ upvoters: tValue });
        });
        test('non-empty array => SUCCESS', () => {
            var tValue = ['thisisauid', 'anotheruid'];
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject( { upvoters: tValue });
        });
        test.todo('array with only string elements => SUCCESS');
        test.todo('array with non-string elements => ERROR');
        test('int => ERROR', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('string => ERROR', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ upvoters: [] });
        });
    });
    describe('downvoters', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'downvoters';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('[] => SUCCESS', () => {
            var tValue = [];
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ downvoters: tValue });
        });
        test('non-empty array => SUCCESS', () => {
            var tValue = ['thisisauid', 'anotheruid'];
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ downvoters: tValue });
        })
        test.todo('array with only string elements => SUCCESS');
        test.todo('array with non-string elements => ERROR');
        test('int => ERROR', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('string => ERROR', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ downvoters: [] });
        });
    });
    describe('title', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'title';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ title: tValue });
        })
        test('blank string => SUCCESS', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ title: tValue });
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ title: '' });
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getUpdatedConfig();
            delete config[tProperty];
            expect(Comment(config)).toMatchObject({ title: '' });
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
    });
    describe('userAvatarURL', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'userAvatarURL';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'spam';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ userAvatarURL: tValue });
        })
        test('blank string => SUCCESS', () => {
            var tValue = '';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ userAvatarURL: tValue });
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ userAvatarURL: '' });
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getUpdatedConfig();
            delete config[tProperty];
            expect(Comment(config)).toMatchObject({ userAvatarURL: '' });
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getUpdatedConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
    });
});

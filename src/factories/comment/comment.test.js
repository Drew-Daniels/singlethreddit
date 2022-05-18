import 'dotenv/config';
import Comment from './comment';
import {getBoundPropertyUpdater} from '../../utils/get/get';

var defaultConfig = {
    // REQUIRED - no default arguments provided
    email: process.env.VALID_GMAIL_ADDRESS,
    groupName: 'fakegroup',
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
    describe('email', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'email';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('valid google email => SUCCESS', () => {
            var tValue = process.env.VALID_GMAIL_ADDRESS;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ email : tValue });
        });
        test('@yahoo.com => ERROR', () => {
            var tValue = 'tester@yahoo.com';
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
    describe('groupName', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'groupName';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue= 'spam';
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ groupName : tValue });
        })
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
        test('int > 0 => SUCCESS', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ timeCreated: 1 });
        })
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getUpdatedConfig();
            delete config[tProperty];
            expect(Comment(config)).toMatchObject({ timeCreated: expect.any(Number)})
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ timeCreated: expect.any(Number)})
        });
        test('int < 0 => ERROR', () => {
            var tValue = -1;
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
    
    describe('timeEdited', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'timeEdited';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('int > 0 => SUCCESS', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ timeEdited: 1 });
        })
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getUpdatedConfig();
            delete config[tProperty];
            expect(Comment(config)).toMatchObject({ timeEdited: expect.any(Number)})
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ timeEdited: expect.any(Number)})
        });
        test('int < 0 => ERROR', () => {
            var tValue = -1;
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
    describe('numUpvotes', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'numUpvotes';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('0 => SUCCESS', () => {
            var tValue = 0;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ numUpvotes: tValue });
        });
        test('int > 0 => SUCCESS', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ numUpvotes: tValue });
        });
        test('int < 0 => ERROR', () => {
            var tValue = -1;
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
            expect(Comment(config)).toMatchObject({ numUpvotes: 0 });
        });
    });
    describe('numDownvotes', () => {
        var tProperty;
        var getUpdatedConfig;
        beforeAll(() => {
            tProperty = 'numDownvotes';
            getUpdatedConfig = getPropUpdater(tProperty);
        });
        test('0 => SUCCESS', () => {
            var tValue = 0;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ numDownvotes: tValue });
        });
        test('int > 0 => SUCCESS', () => {
            var tValue = 1;
            var config = getUpdatedConfig(tValue);
            expect(Comment(config)).toMatchObject({ numDownvotes: tValue });
        });
        test('int < 0 => ERROR', () => {
            var tValue = -1;
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
            expect(Comment(config)).toMatchObject({ numDownvotes: 0 });
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
});

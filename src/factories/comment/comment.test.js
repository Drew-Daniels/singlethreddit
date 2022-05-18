import 'dotenv/config';
import Comment from './comment';
import {getUpdatedObj as guo} from '../../utils/get/get';

var defaultConfig = {
    // REQUIRED - no default arguments provided
    email: process.env.VALID_GMAIL_ADDRESS,
    groupName: 'fakegroup',
    body: 'This will be a comment body',
    // default args...
};

/**
 * Returns a copy of the default configuration object with updated key-value pair if provided as args.
 * If no arguments are provided, a copy of the default configuration is returned.
 * @param {string} tProperty 
 * @param {any} tValue 
 * @returns [Config object]
 */
function getTestConfig(tProperty, tValue) {
    var tConfig = {...defaultConfig}
    if (arguments) {
        tConfig[tProperty] = tValue;
    }
    return tConfig;
}

describe('REQUIRED parameters', () => {
    describe('email', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'email';
            getConfig = getTestConfig.bind(null, tProperty);
        });
        test('valid google email => SUCCESS', () => {
            var tValue = process.env.VALID_GMAIL_ADDRESS;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ email : tValue });
        });
        test('@yahoo.com => ERROR', () => {
            var tValue = 'tester@yahoo.com';
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('undefined => ERROR', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
    });
    describe('groupName', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'groupName';
            getConfig = getTestConfig.bind(null, tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue= 'spam';
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ groupName : tValue });
        })
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = getTestConfig();
            delete config[tProperty];
            expect(() => Comment(config))
                .toThrow();
        });
    });
    describe('body', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'body';
            getConfig = getTestConfig.bind(null, tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'spam';
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ body: tValue });
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('explicit (passed) undefined => ERROR', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('implicit (not passed) undefined => ERROR', () => {
            var config = getConfig();
            delete config[tProperty];
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
    });
});

describe('OPTIONAL parameters', () => {
    describe('parentId', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'parentId';
            getConfig = getTestConfig.bind(null, tProperty)
        });
        test('blank string => SUCCESS', () => {
            var tValue = '';
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject(config);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'iamauniqueparentid';
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ parentId: tValue });
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getTestConfig();
            delete config[tProperty];
            expect(Comment(config))
                .toMatchObject({ parentId: '' });
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ parentId: '' });
        });
        test('number 0 => ERROR', () => {
            var tValue = 0;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('number 1 => ERROR', () => {
            var tValue = 1;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('boolean true => ERROR', () => {
            var tValue = true;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();        
        })
        test('boolean false => ERROR', () => {
            var tValue = false;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        })
    });
    describe('timeCreated', () => {
        var tProperty;
        var getConfig
        beforeAll(() => {
            tProperty = 'timeCreated';
            getConfig = getTestConfig.bind(null, tProperty)
        });
        test('int > 0 => SUCCESS', () => {
            var tValue = 1;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ timeCreated: 1 });
        })
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getConfig();
            delete config[tProperty];
            expect(Comment(config))
                .toMatchObject({ timeCreated: expect.any(Number)})
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ timeCreated: expect.any(Number)})
        });
        test('int < 0 => ERROR', () => {
            var tValue = -1;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        })
        test('0 => ERROR', () => {
            var tValue = 0;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
    });
    
    describe('timeEdited', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'timeEdited';
            getConfig = getTestConfig.bind(null, tProperty);
        });
        test('int > 0 => SUCCESS', () => {
            var tValue = 1;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ timeEdited: 1 });
        })
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getConfig();
            delete config[tProperty];
            expect(Comment(config))
                .toMatchObject({ timeEdited: expect.any(Number)})
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ timeEdited: expect.any(Number)})
        });
        test('int < 0 => ERROR', () => {
            var tValue = -1;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        })
        test('0 => ERROR', () => {
            var tValue = 0;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
    });
    describe('numUpvotes', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'numUpvotes';
            getConfig = getTestConfig.bind(null, tProperty);
        });
        test('0 => SUCCESS', () => {
            var tValue = 0;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ numUpvotes: tValue });
        });
        test('int > 0 => SUCCESS', () => {
            var tValue = 1;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ numUpvotes: tValue });
        });
        test('int < 0 => ERROR', () => {
            var tValue = -1;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('string => ERROR', () => {
            var tValue = 'spam';
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ numUpvotes: 0 });
        });
    });
    describe('numDownvotes', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'numDownvotes';
            getConfig = getTestConfig.bind(null, tProperty);
        });
        test('0 => SUCCESS', () => {
            var tValue = 0;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ numDownvotes: tValue });
        });
        test('int > 0 => SUCCESS', () => {
            var tValue = 1;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ numDownvotes: tValue });
        });
        test('int < 0 => ERROR', () => {
            var tValue = -1;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('string => ERROR', () => {
            var tValue = 'spam';
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ numDownvotes: 0 });
        });
    });
    describe('title', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'title';
            getConfig = getTestConfig.bind(null, tProperty);
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'spam';
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ title: tValue });
        })
        test('blank string => SUCCESS', () => {
            var tValue = '';
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ title: tValue });
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ title: '' });
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getConfig();
            delete config[tProperty];
            expect(Comment(config))
                .toMatchObject({ title: '' });
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
    });
});

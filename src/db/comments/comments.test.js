import 'dotenv/config';
import { Comment } from './comments';

var defaultConfig = {
    // REQUIRED - no defualt arguments provided
    email: process.env.VALID_GMAIL_ADDRESS,
    groupName: 'fakegroup',
    body: 'This will be a comment body',
    // default arguments from Comment factory will be used for all other arguments
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
        test.todo('blank string => ERROR');
        test.todo('null => ERROR');
        test.todo('undefined => ERROR');
    });
    
    describe('timeEdited', () => {
        var tProperty;
        var getConfig;
        beforeAll(() => {
            tProperty = 'timeEdited';
            getConfig = getTestConfig.bind(null, tProperty);
        });
        test.todo('blank string => ERROR');
        test.todo('null => ERROR');
        test.todo('undefined => ERROR');
    });
    describe('numUpvotes', () => {
        test.todo('0 as integer => SUCCESS');
        test.todo('int > 0 => SUCCESS');
        test.todo('negative integer => ERROR');
        test.todo('negative decimal => ERROR');
        test.todo('0 as decimal => ERROR');
        test.todo('string => ERROR');
        test.todo('null => ERROR');
        test.todo('undefined => ERROR');
    });
    describe('numDownvotes', () => {
        test.todo('0 as integer => SUCCESS');
        test.todo('int > 0 => SUCCESS');
        test.todo('negative integer => ERROR');
        test.todo('negative decimal => ERROR');
        test.todo('0 as decimal => ERROR');
        test.todo('string => ERROR');
        test.todo('null => ERROR');
        test.todo('undefined => ERROR');
    });
    describe('title', () => {
        test.todo('blank string => ERROR');
        test.todo('null => ERROR');
        test.todo('undefined => SUCCESS');
    });
    describe('imageUrl', () => {
        test.todo('blank string => ERROR');
        test.todo('null => ERROR');
        test.todo('undefined => SUCCESS');
    });
});

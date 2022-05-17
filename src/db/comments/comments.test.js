import 'dotenv/config';
import { Comment } from './comments';

var defaultConfig = {
    // REQUIRED - no defualt arguments provided
    email: process.env.VALID_GMAIL_ADDRESS,
    groupName: 'fakegroup',
    body: '',
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
    describe('groupName', () => {
        var getConfig
        beforeAll(() => {
            getConfig = getTestConfig.bind(null, 'groupName')
        });
        test('non-blank string => SUCCESS', () => {
            var tValue= 'spam';
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ groupName : tValue });
        })
        test('"" => ERROR', () => {
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
            delete config.groupName;
            expect(() => Comment(config))
                .toThrow();
        });
    });
});

describe('OPTIONAL parameters', () => {
    describe('parentId', () => {
        var getConfig
        beforeAll(() => {
            getConfig = getTestConfig.bind(null, 'parentId')
        });
        test('explicit (passed) undefined => SUCCESS', () => {
            var tValue = undefined;
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ parentId : undefined })
        });
        test('implicit (not passed) undefined => SUCCESS', () => {
            var config = getTestConfig();
            expect(Comment(config))
                .toMatchObject({ parentId : undefined })
        });
        test('non-blank string => SUCCESS', () => {
            var tValue = 'iamauniqueparentid';
            var config = getConfig(tValue);
            expect(Comment(config))
                .toMatchObject({ parentId: tValue });
        });
        test('number 0 => ERROR', () => {
            var tValue = 0;
            var config = getConfig(tValue);
            expect(() => Comment(config))
                .toThrow();
        });
        test('null => ERROR', () => {
            var tValue = null;
            var config = getConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('blank string => ERROR', () => {
            var tValue = '';
            var config = getConfig(tValue);
            expect(() => Comment(config)).toThrow();
        });
        test('number 1 => ERROR', () => {
            var tValue = 1;
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
    
    describe('email', () => {
        var getConfig
        beforeAll(() => {
            getConfig = getTestConfig.bind(null, 'email')
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
        test('"" => ERROR', () => {
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
    describe('timeCreated', () => {
        var getConfig
        beforeAll(() => {
            getConfig = getTestConfig.bind(null, 'timeCreated')
        });
        test.todo('"" => ERROR');
        test.todo('null => ERROR');
        test.todo('undefined => ERROR');
    });
    
    describe('timeEdited', () => {
        var getConfig;
        beforeAll(() => {
            getConfig = getTestConfig.bind(null, 'timeEdited')
        });
        test.todo('"" => ERROR');
        test.todo('null => ERROR');
        test.todo('undefined => ERROR');
    });    
});

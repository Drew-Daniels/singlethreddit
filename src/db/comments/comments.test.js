import 'dotenv/config';
import { Comment } from './comments';

var defaultConfig = {
    // REQUIRED - no defualt arguments provided
    email: process.env.VALID_GMAIL_ADDRESS,
    groupName: 'fakegroup',
    body: '',
    // default arguments will be used for all other arguments
};

var tProperty;
var tPattern;
var tRegex;
var config;

function getTestConfig(tProperty, tValue) {
    var tConfig = {...defaultConfig}
    // override
    tConfig[tProperty] = tValue;
    return tConfig;
}

describe('parentId', () => {
    beforeAll(() => {
        tProperty = 'parentId';
    });
    test('explicit (passed) undefined => SUCCESS', () => {
        var tValue = undefined;
        var config = getTestConfig(tProperty, tValue);
        expect(Comment(config))
            .toMatchObject({parentId: undefined})
    });
    test('implicit (not passed) undefined => SUCCESS', () => {
        var config = {...defaultConfig};
        expect(Comment(config))
            .toMatchObject({parentId: undefined})
    });
    test('non-blank string => SUCCESS', () => {
        var tValue = 'iamauniqueparentid';
        var config = getTestConfig(tProperty, tValue);
        expect(Comment(config))
            .toMatchObject({ parentId: tValue });
    });
    test('number 0 => ERROR', () => {
        var tValue = 0;
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();
    });
    test('null => ERROR', () => {
        var tValue = null;
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config)).toThrow();
    });
    test('blank string => ERROR', () => {
        var tValue = '';
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config)).toThrow();
    });
    test('number 1 => ERROR', () => {
        var tValue = 1;
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();
    });
    test('boolean true => ERROR', () => {
        var tValue = true;
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();        
    })
    test('boolean false => ERROR', () => {
        var tValue = false;
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();
    })
});

describe('email', () => {
    beforeAll(() => {
        tProperty = 'email';
    });
    test('valid google email => SUCCESS', () => {
        var tValue = process.env.VALID_GMAIL_ADDRESS;
        var config = getTestConfig(tProperty, tValue);
        expect(Comment(config))
            .toMatchObject({ email: tValue });
    });
    test('@yahoo.com => ERROR', () => {
        var tValue = 'tester@yahoo.com';
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();
    });
    test('"" => ERROR', () => {
        var tValue = '';
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();
    });
    test('null => ERROR', () => {
        var tValue = null;
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();
    });
    test('undefined => ERROR', () => {
        var tValue = undefined;
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();
    });
});

describe('groupName', () => {
    beforeAll(() => {
        tProperty = 'groupName';
    });
    test.todo('"" => ERROR');
    test.todo('null => ERROR');
    test.todo('undefined => ERROR');

});

describe('timeCreated', () => {
    beforeAll(() => {
        tProperty = 'timeCreated';
    });
    test.todo('"" => ERROR');
    test.todo('null => ERROR');
    test.todo('undefined => ERROR');
});

describe('timeEdited', () => {
    beforeAll(() => {
        tProperty = 'timeEdited';
    });
    test.todo('"" => ERROR');
    test.todo('null => ERROR');
    test.todo('undefined => ERROR');
});
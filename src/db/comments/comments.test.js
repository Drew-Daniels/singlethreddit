import { Comment } from './comments';

var defaultConfig = {
    // REQUIRED
    email: 'fake@email.com',
    groupName: 'fakegroup',
    body: '',
    // OPTIONAL
    parentId: undefined,
    timeCreated: 'something',
    timeEdited: 'somethingelse',
    numUpvotes: 0,
    numDownvotes: 0,
    title: undefined,
    imageUrl: undefined,
};

var tProperty;
var config;

function getTestConfig(tProperty, tValue) {
    var tConfig = {...defaultConfig}
    // override
    tConfig[tProperty] = tValue;
    console.log(tConfig);
    return tConfig;
}

describe('parentId', () => {
    beforeAll(() => {
        tProperty = 'parentId';
    });
    test('null => SUCCESS', () => {
        var tValue = null;
        var config = getTestConfig(tProperty, tValue);
        expect(Comment(config))
            .toMatchObject({parentId: undefined})
    });
    test('blank string => SUCCESS', () => {
        var tValue = '';
        var config = getTestConfig(tProperty, tValue);
        expect(Comment(config))
            .toMatchObject({parentId: undefined})
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
    test('number 0 => ERROR', () => {
        var tValue = 0;
        var config = getTestConfig(tProperty, tValue);
        expect(() => Comment(config))
            .toThrow();
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
    test('@gmail.com => SUCCESS', () => {
        var tValue = 'tester@gmail.com';
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
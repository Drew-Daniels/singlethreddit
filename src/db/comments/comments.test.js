import { Comment } from './comments';

var parentId, email, groupName, timeCreated, timeEdited, numUpvotes, numDownvotes, title, body, imageUrl;

beforeAll(() => {
    parentId = 'xxx';
    email = 'fake@email.com';
    groupName = 'fakegroup';
    timeCreated = 'something';
    timeEdited = 'somethingelse';
    numUpvotes = 0;
    numDownvotes = 0;
    title = '';
    body = '';
    imageUrl = '';
})

describe('parentId', () => {
    test('null => SUCCESS', () => {
        var parentId = null;
        expect(Comment(parentId, email, groupName, timeCreated, timeEdited, numUpvotes, numDownvotes, title, body, imageUrl))
            .toMatchObject({parentId: null})
    });
    test('blank string => SUCCESS', () => {
        var parentId = '';
        expect(Comment(parentId, email, groupName, timeCreated, timeEdited, numUpvotes, numDownvotes, title, body, imageUrl))
            .toMatchObject({parentId: null})
    });
    test('undefined => SUCCESS', () => {
        var parentId = undefined;
        expect(Comment(parentId, email, groupName, timeCreated, timeEdited, numUpvotes, numDownvotes, title, body, imageUrl))
            .toMatchObject({parentId: null})
    });
    test('number => ERROR', () => {
        var parentId = 1;
        expect(() => Comment(parentId, email, groupName, timeCreated, timeEdited, numUpvotes, numDownvotes, title, body, imageUrl))
            .toThrow();
    });
    test('boolean => ERROR', () => {
        var parentId = false;
        expect(() => Comment(parentId, email, groupName, timeCreated, timeEdited, numUpvotes, numDownvotes, title, body, imageUrl))
            .toThrow();
    })
});

// describe('email', () => {
//     test('')
// })

// it('Creates a comment object', () => {
//     expect(Comment(
//             parentId,
//             email,
//             groupName,
//             timeCreated,
//             timeEdited,
//             numUpvotes,
//             numDownvotes,
//             title,
//             body,
//             imageUrl
//         ))
//         .toMatchObject({ 
//             parentId,
//             email,
//             groupName,
//             timeCreated,
//             timeEdited,
//             numUpvotes,
//             numDownvotes,
//             title,
//             body,
//             imageUrl,
//         })
// })
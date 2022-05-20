import { delGroup, getGroup, setGroup } from './groups';

const groupData = [
    'testgroup',
    'Test Group',
    'This is a test group'
]

describe('delGroup', () => {
    test.todo('deletes a group');
});

describe('getGroup', () => {
    test.todo('gets a group');
});

describe('setGroup', () => {
    test('adds a group', async () => {
        const result = await setGroup(...groupData);
        expect(result).toMatch(true);
    });
    test.todo('overwrites a group');
});
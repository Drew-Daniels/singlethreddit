import Group from './group';

describe('REQUIRED parameters', () => {
    describe('name', () => {
        test.todo('non-blank string => SUCCESS');
        test.todo('blank string => ERROR');
        test.todo('number => ERROR');
        test.todo('boolean => ERROR');
        test.todo('explicit (passed) undefined => ERROR');
        test.todo('implicit (not passed) undefined => ERROR');
    });
    describe('description', () => {
        test.todo('non-blank string => SUCCESS');
        test.todo('blank string => ERROR');
        test.todo('number => ERROR');
        test.todo('boolean => ERROR');
        test.todo('explicit (passed) undefined => ERROR');
        test.todo('implicit (not passed) undefined => ERROR');
    });
});

describe('OPTIONAL parameters', () => {
    describe('timeCreated', () => {
        test.todo('int > 0 => SUCCESS');
        test.todo('0 => ERROR');
        test.todo('int < 0 => ERROR');
        test.todo('string => ERROR');
        test.todo('boolean => ERROR');
        test.todo('object => ERROR');
    });
    describe('members', () => {
        test.todo('array => SUCCESS');
        test.todo('explicit (passed) undefined => SUCCESS');
        test.todo('implicit (not passed) undefined => SUCCESS');
        test.todo('int => ERROR');
        test.todo('string => ERROR');
        test.todo('boolean => ERROR');
    });
});
import { DateTime } from 'luxon';
import { getTimeSince } from "./time";

var testDate;
const STRING = 'spam';
const NUMBER = 1;
const BOOLEAN = true;
const OBJECT = {};
const ARRAY = [];
const UNDEFINED = undefined;

beforeEach(() => {
    testDate = new Date();
})
describe('error handling', () => {
    test('1 JS DateTime object passed', () => {
        expect(() => getTimeSince(testDate)).not.toThrow();
    });
    test('string => ERROR', () => {
        expect(() => getTimeSince(STRING)).toThrow();
    });
    test('number => ERROR', () => {
        expect(() => getTimeSince(NUMBER)).toThrow();
    });
    test('boolean => ERROR', () => {
        expect(() => getTimeSince(BOOLEAN)).toThrow();
    });
    test('object => ERROR', () => {
        expect(() => getTimeSince(OBJECT)).toThrow();
    });
    test('array => ERROR', () => {
        expect(() => getTimeSince(ARRAY)).toThrow();
    });
    test('explicit (passed) undefined', () => {
        expect(() => getTimeSince(UNDEFINED)).toThrow();
    });
    test('implicit (not passed) undefined => ERROR', () => {
        expect(() => getTimeSince()).toThrow();
    });
});

describe('days', () => {
    test.todo('gets days since now');
});

describe('hours', () => {
    test.todo('gets hours since now');
});

describe('minutes', () => {
    test.todo('gets minutes since now');
});

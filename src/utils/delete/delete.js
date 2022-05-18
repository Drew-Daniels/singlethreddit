/**
 * Deletes the last property of a given object or array
 * @param {object} obj
 */
export function pop(obj) {
    if (!(typeof obj === 'object')) {
        throw new Error('"obj" must be an object (includes Arrays)');
    }
    if (!(obj.length === undefined)) {
        delete obj[obj.length-1];
    }
    return obj;
};


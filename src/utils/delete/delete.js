/**
 * Deletes the last property of a given object
 * @param {object} obj 
 */
export function deleteLastObjectProperty (obj) {
    console.log(obj)
    if (!(typeof obj === 'object')) {
        throw new Error('"obj" must be an object');
    }
    if (Array.isArray(obj)) {
        throw new Error('"obj" cannot be an array');
    }
    if (!(obj.length === undefined)) {
        delete obj[obj.length-1];
    }
    return obj;
};


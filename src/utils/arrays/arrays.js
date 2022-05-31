/**
 * Creates a copy of an array, finds and removes target from that array, and returns a new array.
 * @param {*} target 
 * @param {array} arr 
 * @returns New array
 */
export function findAndRemoveFromArray(target, arr) {
    var newArr = [...arr];
    if (arr.includes(target)) {
        const i = newArr.findIndex(el => el === target);
        newArr.splice(i, 1);
    }
    return newArr;
}

/**
 * Takes an array of objects (where each object must contain a parentId field and an id field) and returns a hierarchical array
 * @param {array of objects} array 
 * @returns array
 */
export function getTree(array) {
    // create a 'hash' lookup table where the id of a node is used as a key
    const hash = {};
    array.forEach(el => hash[el.id] = {...el, children: []});

    const tree = [];
    array.forEach(el => {
        if (el.parentId) {
            // is a child
            hash[el.parentId].children.push(hash[el.id]);
        } else {
            // is a parent
            tree.push(hash[el.id]);
        }   
    });
    return tree;
}
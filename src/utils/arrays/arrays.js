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

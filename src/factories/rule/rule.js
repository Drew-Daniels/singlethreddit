/**
 * 
 * @param {integer} number 
 * @param {string} description 
 * @returns [Rule object]
 */
const Rule = (number, description) => {
    if (!(Number.isSafeInteger(number)) || number < 1) { throw new Error('"number" must be an integer between 1 and 9,007,199,254,740,991')};
    if (!(typeof description === 'string')) { throw new Error('"description" must be a string') };
    return ({
        number,
        description
    })
}

export default Rule;

/**
 * Takes an object and returns a copy with an updated target value for a given target property.
 * If the property does not exist on the target object it is created.
 * @param {object} tObj - target object you want to update the property-value pair of
 * @param {string} tProp - target property you want to override
 * @param {any} tVal - target value to set the target property to
 * @returns [object]
 */
 export function getUpdatedObject(tObj, tProp, tVal) {
    var tConfig = {...tObj}
    if (arguments.length === 3) {
        if (!isObj(tObj)) { throw new Error('"tObj" must be an object')};
        if (!isString(tProp)) { throw new Error('"tProp" must be type string') }
        tConfig[tProp] = tVal;
    }
    return tConfig;
    
    function isObj(obj) {return typeof obj === 'object'};
    function isString(target) { return typeof target === 'string'};
}
/**
 * Returns a bound function that updates a specific property on a given object
 * with a passed in value.
 * @param {object} obj 
 * @param {string} prop 
 * @returns [function]
 */
export function getBoundPropertyUpdater(obj, prop) {
    if (arguments.length < 2) { throw new Error('All arguments are required')};
    if (!(typeof obj === 'object') || Array.isArray(obj)) { throw new Error('"obj" must be an object')};
    if (!(typeof prop === 'string')) { throw new Error('"prop" must be type string')};
    return getUpdatedObject.bind(null, obj, prop);
}
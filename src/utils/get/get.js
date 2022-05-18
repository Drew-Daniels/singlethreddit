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
        if (!isString(tVal)) { throw new Error('"tVal" must be type string') }
        tConfig[tProp] = tVal;
    }
    return tConfig;
    
    function isObj(obj) {return typeof obj === 'object'};
    function isString(target) { return typeof target === 'string'};
}
/**
 * @param {object} obj 
 * @param {string} prop 
 * @returns [object]
 */
export const getBoundObjectUpdater = (obj, prop) => {
    return getUpdatedObject.bind(obj, prop);
}
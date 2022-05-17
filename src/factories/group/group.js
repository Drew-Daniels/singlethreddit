/**
 * Factory function that runs checks on passed in values that are to be used to create a Group document in the database.
 * @param {string} baseName
 * @param {string} display
 * @param {string} description
 * @param {integer} timeCreated
 * @param {array} members
 * @returns validated [Group object]
 */
const Group = ({
    baseName,
    displayName,
    description,
    timeCreated=Date.now(),
    members=[]
    } = {}) => {
    // run checks here
    // REQUIRED
    if (!baseNameValid(baseName)) { throw new Error('"name" is required and must be a non-blank string') };
    if (!displayNameValid(displayName)) { throw new Error('"displayName" is required and must be a non-blank string') };
    if (!descriptionValid(description)) { throw new Error('"description" is required and must be a non-blank string')};
    // OPTIONAL
    if (!timeCreatedValid(timeCreated)) { throw new Error('"timeCreated" must be an integer greater than 0') };
    if (!membersValid(members)) { throw new Error('"members" must be an array') };
    // return object after validation
    return (
        {
            baseName,
            displayName,
            description,
            timeCreated,
            members,
            getBaseNameAsPath: () => `g/${baseName}`,
        }
    )

    function baseNameValid(baseName) {
        return (baseName && typeof baseName === 'string');
    };
    function displayNameValid(displayName) {
        return (displayName && typeof displayName === 'string');
    };
    function descriptionValid(description) {
        return (description && typeof description === 'string');
    };
    function timeCreatedValid(timeCreated) {
        return (Number.isInteger(timeCreated) && timeCreated > 0);
    };
    function membersValid(members) {
        return (Array.isArray(members));
    };
}

export default Group;

import { Timestamp } from 'firebase/firestore';
/**
 * Factory function that runs checks on passed in values that are to be used to create a Comment document in the database.
 * @param {string} parentId 
 * @param {string} email 
 * @param {string} baseName 
 * @param {string} body 
 * @param {Timestamp} timeCreated 
 * @param {Timestamp} timeEdited 
 * @param {array} upvoters 
 * @param {array} downvoters 
 * @param {string} title 
 * @param {string} userAvatarURL
 * @param {string} groupAvatarURL
 * @returns validated [Comment object]
 */
 const Comment = ({
    uid,
    userName,
    baseName, 
    body,
    parentId='',
    timeCreated=Timestamp.now(), 
    timeEdited=Timestamp.now(), 
    upvoters=[], 
    downvoters=[], 
    title='',
    userAvatarURL='',
    } = {}) => {
    // CHECKS
    // REQUIRED parameters
    if (!validUID(uid)) { throw new Error('"uid" is required and must be a non-blank string')};
    if (!validUserName(userName)) { throw new Error('"userName" is required and must be a non-blank string')};
    if (!validGroupName(baseName)) {throw new Error('"baseName" is required and must be a non-blank string')};
    if (!validBody(body)) {throw new Error('"body" is required and must be a non-blank string')};
    // OPTIONAL parameters
    if (!validParentId(parentId)) {throw new Error('"parentId" must be a non-blank string or undefined')};
    if (!validTimestamp(timeCreated)) {throw new Error('"timeCreated" must be of Firebase Timestamp type')};
    if (!validTimestamp(timeEdited)) {throw new Error('"timeEdited" must be of Firebase Timestamp type')};
    if (!validUpvoters(upvoters)) {throw new Error('"upvoters" must be an array')};
    if (!validDownvoters(downvoters)) {throw new Error('"downvoters" must be an array')};
    if (!validTitle(title)) {throw new Error('"title" must be a string')};
    if (!validAvatarURL(userAvatarURL)) { throw new Error('"userAvatarURL" must be a string')};
    // CHECKS FINISHED
    return (
        {
            uid,
            userName,
            baseName,
            body,
            parentId,
            timeCreated,
            timeEdited,
            upvoters,
            downvoters,
            title,
            userAvatarURL,
            getKarma: () => upvoters.length - downvoters.length
        }
    )
    // validation function definitions
    function validUID(uid) {
        return (uid && typeof uid === 'string');
    }
    function validUserName(userName) {
        return (userName && typeof userName === 'string');
    }
    function validGroupName(baseName) {
        return (baseName && typeof baseName === 'string');
    }
    function validBody(body) {
        return (body && typeof body === 'string')
    }
    function validParentId(parentId) {
        return (typeof parentId === 'string');
    }
    function validTimestamp(timestamp) {
        return (timestamp instanceof Timestamp);
    }
    function validUpvoters(upvoters) {
        return Array.isArray(upvoters);
    }
    function validDownvoters(downvoters) {
        return Array.isArray(downvoters);
    }
    function validTitle(title) {
        return (typeof title === 'string');
    }
    function validAvatarURL(avatarURL) {
        return (typeof avatarURL === 'string');
    }
}

export default Comment;

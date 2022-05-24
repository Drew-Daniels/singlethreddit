import { MIN_UPVOTES, MIN_DOWNVOTES } from '../../constants';
import { Timestamp } from 'firebase/firestore';
/**
 * Factory function that runs checks on passed in values that are to be used to create a Comment document in the database.
 * @param {string} parentId 
 * @param {string} email 
 * @param {string} baseName 
 * @param {string} body 
 * @param {Timestamp} timeCreated 
 * @param {Timestamp} timeEdited 
 * @param {integer} numUpvotes 
 * @param {integer} numDownvotes 
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
    numUpvotes=0, 
    numDownvotes=0, 
    title='',
    userAvatarURL='',
    groupAvatarURL='',
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
    if (!validNumUpvotes(numUpvotes)) {throw new Error('"numUpvotes" must be an integer greater than or equal to 0')};
    if (!validNumDownvotes(numDownvotes)) {throw new Error('"numDownvotes" must be an integer less than or equal to 0')};
    if (!validTitle(title)) {throw new Error('"title" must be a string')};
    if (!validAvatarURL(userAvatarURL)) { throw new Error('"userAvatarURL" must be a string')};
    if (!validAvatarURL(groupAvatarURL)) { throw new Error('"groupAvatarURL" must be a string')};
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
            numUpvotes,
            numDownvotes,
            title,
            userAvatarURL,
            groupAvatarURL,
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
    function validNumUpvotes(numUpvotes) {
        return (Number.isInteger(numUpvotes) && numUpvotes >= MIN_UPVOTES);
    }
    function validNumDownvotes(numDownvotes) {
        return (Number.isInteger(numDownvotes) && numDownvotes >= MIN_DOWNVOTES);
    }
    function validTitle(title) {
        return (typeof title === 'string');
    }
    function validAvatarURL(avatarURL) {
        return (typeof avatarURL === 'string');
    }
}

export default Comment;

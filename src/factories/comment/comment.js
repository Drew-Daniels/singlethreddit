import { MIN_UPVOTES, MIN_DOWNVOTES } from '../../constants';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
/**
 * Factory function that runs checks on passed in values that are to be used to create a Comment document in the database.
 * @param {string} parentId 
 * @param {string} email 
 * @param {string} groupName 
 * @param {timestamp} timeCreated 
 * @param {timestamp} timeEdited 
 * @param {integer} numUpvotes 
 * @param {integer} numDownvotes 
 * @param {string} title 
 * @param {string} body 
 * @returns validated [Comment object]
 */
 const Comment = ({
    uid,        // User.uid
    userName,   // User.displayName
    groupName, 
    body,
    parentId='',
    timeCreated=serverTimestamp(), 
    timeEdited=serverTimestamp(), 
    numUpvotes=0, 
    numDownvotes=0, 
    title=''
    } = {}) => {
    // CHECKS
    // REQUIRED parameters
    if (!validUID(uid)) { throw new Error('"uid" is required and must be a non-blank string')};
    if (!validUserName(userName)) { throw new Error('"userName" is required and must be a non-blank string')};
    if (!validGroupName(groupName)) {throw new Error('"groupName" is required and must be a non-blank string')};
    if (!validBody(body)) {throw new Error('"body" is required and must be a non-blank string')};
    // OPTIONAL parameters
    if (!validParentId(parentId)) {throw new Error('"parentId" must be a non-blank string or undefined')};
    if (!validTimeCreated(timeCreated)) {throw new Error('"timeCreated" must be an integer greater than 0')};
    if (!validTimeEdited(timeEdited)) {throw new Error('"timeEdited" must be an integer greater than 0')};
    if (!validNumUpvotes(numUpvotes)) {throw new Error('"numUpvotes" must be an integer greater than or equal to 0')}
    if (!validNumDownvotes(numDownvotes)) {throw new Error('"numDownvotes" must be an integer less than or equal to 0')}
    if (!validTitle(title)) {throw new Error('"title" must be a string')}
    // CHECKS FINISHED
    return (
        {
            uid,
            userName,
            groupName,
            body,
            parentId,
            timeCreated,
            timeEdited,
            numUpvotes,
            numDownvotes,
            title
        }
    )

    // validation function definitions
    function validUID(uid) {
        return (uid && typeof uid === 'string');
    }
    function validUserName(userName) {
        return (userName && typeof userName === 'string');
    }
    function validGroupName(groupName) {
        return (groupName && typeof groupName === 'string');
    }
    function validBody(body) {
        return (body && typeof body === 'string')
    }
    function validParentId(parentId) {
        return (typeof parentId === 'string');
    }
    function validTimeCreated(timeCreated) {
        // 	1652763600 is 2022-05-17 00:00:00 in YYYY-MM-DD format
        return (timeCreated instanceof Timestamp);
    }
    function validTimeEdited(timeEdited) {
        return (timeEdited instanceof Timestamp);
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
}

export default Comment;

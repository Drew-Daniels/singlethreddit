import { MIN_TIMESTAMP, MIN_UPVOTES, MIN_DOWNVOTES } from '../../constants';
import EmailValidation from 'emailvalid';
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
    email, 
    groupName, 
    body,
    parentId='',
    timeCreated=Date.now(), 
    timeEdited=Date.now(), 
    numUpvotes=0, 
    numDownvotes=0, 
    title=''
    } = {}) => {
    // CHECKS
    // REQUIRED parameters
    // email
    if (!validEmail(email)) {
        throw new Error('"email" is required and must be a valid email belonging to gmail.com domain');
    }
    // groupName
    if (!validGroupName(groupName)) {
        throw new Error('"groupName" is required and must be a non-blank string');
    }
    // body
    if (!validBody(body)) {
        throw new Error('"body" is required and must be a non-blank string');
    }
    // OPTIONAL parameters
    // parentId
    if (!validParentId(parentId)) {
        throw new Error('"parentId" must be a non-blank string or undefined')
    }
    // timeCreated
    if (!validTimeCreated(timeCreated)) {
        throw new Error('"timeCreated" must be an integer greater than 0');
    }
    // timeEdited
    if (!validTimeEdited(timeEdited)) {
        throw new Error('"timeEdited" must be an integer greater than 0');
    }
    // numUpvotes
    if (!validNumUpvotes(numUpvotes)) {
        throw new Error('"numUpvotes" must be an integer greater than or equal to 0');
    }
    // numDownvotes
    if (!validNumDownvotes(numDownvotes)) {
        throw new Error('"numDownvotes" must be an integer less than or equal to 0');
    }
    // title
    if (!validTitle(title)) {
        throw new Error('"title" must be a string');
    }
    // CHECKS FINISHED
    return (
        {
            parentId,
            email,
            groupName,
            timeCreated,
            timeEdited,
            numUpvotes,
            numDownvotes,
            title,
            body
        }
    )

    // validation function definitions
    function validEmail(email) {
        if (!email) { return false }
        var config = {
            whitelist: ['gmail.com'],
        }
        var ev = new EmailValidation(config);
        var res = ev.check(email);
        var isValid = res.valid;
        return isValid;
    }
    function validGroupName(group) {
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
        return (Number.isInteger(timeCreated) && timeCreated > MIN_TIMESTAMP);
    }
    function validTimeEdited(timeEdited) {
        return (Number.isInteger(timeEdited) && timeEdited > MIN_TIMESTAMP);
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

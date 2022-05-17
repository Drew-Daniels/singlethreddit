import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import EmailValidation from 'emailvalid';
import { db } from '../../firebase-setup';

const commentRef = collection(db, 'comments');

/**
 * Factory function that runs checks on passed in values that are to be used to create a Comment document in Firebase.
 * @param {string} parentId 
 * @param {string} email 
 * @param {string} groupName 
 * @param {timestamp} timeCreated 
 * @param {timestamp} timeEdited 
 * @param {integer} numUpvotes 
 * @param {integer} numDownvotes 
 * @param {string} title 
 * @param {string} body 
 * @param {string} imageUrl 
 * @returns [Comment object]
 */
const Comment = ({
    email, 
    groupName, 
    body,
    parentId=undefined,
    timeCreated=Date.now(), 
    timeEdited=Date.now(), 
    numUpvotes=0, 
    numDownvotes=0, 
    title=undefined, 
    imageUrl=undefined
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


    // timeEdited

    // numUpvotes

    // numDownvotes

    // title


    // imageUrl


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
            body,
            imageUrl,
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
        var res = true;
        switch (true) {
            case (
                    parentId === null || 
                    parentId === '' ||
                    typeof parentId === 'number' ||
                    typeof parentId === 'bigint' ||
                    typeof parentId === 'boolean'
                ):
                res = false;
                break;
            default:
                break;
        }
        return res;
    }
}

async function delComment() {

}

async function addComment(parentId, email, groupName, timeCreated, timeEdited, numUpvotes, numDownvotes, title, body, imageUrl) {
    const comment = Comment(...arguments)
    await addDoc(commentRef, comment);
}

async function getComment() {

}

export {
    Comment,
    delComment,
    addComment,
    getComment,
}
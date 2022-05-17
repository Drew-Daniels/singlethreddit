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
    const emailErrMsg = '"email" is required and must be a valid email belonging to gmail.com domain'
    if (!email) {
        throw new Error(emailErrMsg);
    } else {
        if (!validEmail(email)) {
            throw new Error(emailErrMsg);
        }
        function validEmail(email) {
            var config = {
                whitelist: ['gmail.com'],
            }
            var ev = new EmailValidation(config);
            var res = ev.check(email);
            var isValid = res.valid;
            return isValid;
        }
    }
    // groupName
    if (!groupName || !typeof groupName === 'string') {
        throw new Error('"groupName" is required and must be a non-blank string');
    }
    // body
    if (!body || !typeof body === 'string') {
        throw new Error ('"body" is required and must be a non-blank string');
    }
    // OPTIONAL parameters
    // parentId
    const parentIdErrMsg = '"parentId" must be a non-blank string or undefined';
    switch (true) {
        case (parentId === null):
            throw new Error(parentIdErrMsg);
        case (parentId === ''):
            throw new Error(parentIdErrMsg);
        case (typeof parentId === 'number' || typeof parentId === 'bigint' || typeof parentId === 'boolean'):
            throw new Error(parentIdErrMsg);
        default:
            // has to be either undefined or a non-blank string
            break;
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
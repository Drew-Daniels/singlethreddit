import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
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
    // parentId
    // undefined, 0, false, null => null
    if (typeof parentId === 'number' || typeof parentId === 'boolean') {
        throw new Error('parentId must be one of the following: undefined, null, "", or a string');
    }
    if (!parentId) {
        // coerce falsy values to null for consistency
        parentId = undefined;
    }

    // email

    // groupName

    // timeCreated

    // timeEdited

    // numUpvotes

    // numDownvotes

    // title

    // body

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
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
const Comment = (parentId, email, groupName, timeCreated, timeEdited, numUpvotes, numDownvotes, title, body, imageUrl) => {
    // CHECKS
    // parentId
    // undefined, 0, false, null => null
    if (!parentId) {
        parentId = null;
    }
    if (!(typeof parentId === 'string')) {
        throw new Error('parentId must be a string')
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
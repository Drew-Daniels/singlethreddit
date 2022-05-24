import Comment from '../../factories/comment/comment';
import { collection, doc, getDoc, getDocs, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-setup';
import { getAuth } from 'firebase/auth';
import { COMMENTS_COLLECTION_NAME } from '../../constants';

const commentsRef = collection(db, COMMENTS_COLLECTION_NAME);

/**
 * Deletes a group with the provided baseName.
 * @param {string} baseName 
 * @returns boolean
 */
async function delComment(id) {
    try {
        await deleteDoc(doc(db, COMMENTS_COLLECTION_NAME, id));
        console.log('Document deleted w/ ID: ', id);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

async function getComment(id) {
    try {
        const docRef = doc(db, COMMENTS_COLLECTION_NAME, id)
        const dSnap = await getDoc(docRef);
        if (dSnap.exists()) {
            const gd = dSnap.data();
            var comment = Comment({
                uid: gd.uid,
                userName: gd.userName,
                baseName: gd.baseName,
                body: gd.body,
                parentId: gd.parentId,
                timeCreated: gd.timeCreated,
                timeEdited: gd.timeEdited,
                numUpvotes: gd.numUpvotes,
                numDownvotes: gd.numDownvotes,
                title: gd.title
            })
        }
        return comment;
    }
    catch (err) {
        console.error(err);
    }
}

async function getComments(ids) {
    if (!(Array.isArray(ids))) { throw new Error('"ids" must be an array') };
    try {
        var comments = [];
        ids.forEach(async (id) => {
            const dSnap = await getComment(id);
            if (dSnap.exists()) {
                comments.push(dSnap.data());
            }
        });
        return comments;
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * Retrieves all Comments from Firestore and adds an id property to each that maps to the docID for that Comment.
 * @returns [array of Comments]
 */
async function getAllComments() {
    const comments = [];
    const qrySnap = await getDocs(commentsRef);
    qrySnap.forEach((c) => {
        const commentData = c.data();
        commentData.id = c.id
        const comment = Comment(commentData);
        comments.push(comment);
    });
    return comments;
}
/**
 * Filters an array of comments to only those that are posts - indicated by a blank parentId
 * If no array of comments is provided, they are retrieved from the database.
 * @param {array} comments 
 * @returns array
 */
async function getAllPosts(comments) {
    if (!comments) {
        comments = await getAllComments();
    }
    comments.filter(comment => comment.parentId === '');
    return comments;
}

function getPostComments(postID, comments) {
    return comments.filter(comment => comment.parentId === postID);
}

/**
 * Adds a comment to Firestore if a Comment does not already exist in Firebase with that id. Otherwise overwrites it.
 * @param {string} uid 
 * @param {string} userName 
 * @param {string} baseName 
 * @param {string} body 
 * @param {string} parentId 
 * @param {Timestamp} timeCreated 
 * @param {Timestamp} timeEdited 
 * @param {integer} numUpvotes 
 * @param {integer} numDownvotes 
 * @param {string} title 
 * @returns boolean
 */
async function addComment(uid, userName, avatarURL, baseName, body, parentId, timeCreated, timeEdited, numUpvotes, numDownvotes, title) {
    const group = Comment({
        uid,
        userName, 
        avatarURL,
        baseName,
        body, 
        parentId, 
        timeCreated, 
        timeEdited, 
        numUpvotes, 
        numDownvotes, 
        title
    });
    try {
        const docRef = await addDoc(commentsRef, group);
        console.log('Document written w/ ID: ', docRef.id);
        return true;
    } 
    catch (err) {
        console.error(err);
        return false;
    }
}

async function updateComment(docID, data) {
    try {
        const docRef = doc(db, COMMENTS_COLLECTION_NAME, docID);
        await updateDoc(docRef, data)
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export {
    delComment,
    getComment,
    getComments,
    getAllComments,
    getAllPosts,
    getPostComments,
    addComment,
    updateComment,
}
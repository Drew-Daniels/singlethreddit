import Comment from '../../factories/comment/comment';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import uniqid from 'uniqid';
import { db } from '../../firebase-setup';
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
        const dRef = doc(db, COMMENTS_COLLECTION_NAME, id)
        const dSnap = await getDoc(dRef);
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

async function getAllComments() {
    const comments = [];
    const qSnap = await getDocs(commentsRef);
    qSnap.forEach((g) => {
        comments.push(g.data());
    })
    return comments;
}

async function getAllPosts() {
    const comments = await getAllComments();
    comments.filter(comment => comment.parentId === '');
    return comments;
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
async function setComment(uid, userName, baseName, body, parentId, timeCreated, timeEdited, numUpvotes, numDownvotes, title) {
    const group = Comment({
        uid,
        userName, 
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
        const dRef = await setDoc(doc(db, COMMENTS_COLLECTION_NAME, baseName), group);
        console.log('Document written w/ ID: ', dRef.id);
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
    setComment,
}
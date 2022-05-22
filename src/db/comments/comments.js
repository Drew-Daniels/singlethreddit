import Comment from '../../factories/group/group';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-setup';
import { COMMENTS_COLLECTION_NAME } from '../../constants';

const commentsRef = collection(db, COMMENTS_COLLECTION_NAME);

/**
 * Deletes a group with the provided baseName.
 * @param {string} baseName 
 * @returns boolean
 */
async function delComment(baseName) {
    try {
        await deleteDoc(doc(db, COMMENTS_COLLECTION_NAME, baseName));
        console.log('Document deleted w/ ID: ', baseName);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

async function getComment(baseName) {
    try {
        const dRef = doc(db, COMMENTS_COLLECTION_NAME, baseName)
        const dSnap = await getDoc(dRef);
        if (dSnap.exists()) {
            const gd = dSnap.data();
            var comment = Comment({
                uid: gd.uid,
                userName: gd.userName,
                groupName: gd.groupName,
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

/**
 * 
 * @param {array} baseNames 
 */
async function getComments(baseNames) {
    if (!(Array.isArray(baseNames))) { throw new Error('"baseNames" must be an array') };
    try {
        var comments = [];
        baseNames.forEach(async baseName => {
            const dRef = doc(db, COMMENTS_COLLECTION_NAME, baseName);
            const dSnap = await getDoc(dRef);
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

}

/**
 * Adds a group to Firestore if it does not already exist, otherwise it overwrites. "baseName" is used as the id field.
 * @param {string} baseName 
 * @param {string} displayName 
 * @param {string} description 
 * @param {integer} timeCreated 
 * @param {array} members 
 */
async function setComment(email, userName, groupName, body, parentId, timeCreated, timeEdited, numUpvotes, numDownvotes, title) {
    const group = Comment({
        email, 
        userName, 
        groupName, 
        body, 
        parentId, 
        timeCreated, 
        timeEdited, 
        numUpvotes, 
        numDownvotes, 
        title
    });
    try {
        const dRef = await setDoc(doc(db, COMMENTS_COLLECTION_NAME, groupName), group);
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
    setComment,
}
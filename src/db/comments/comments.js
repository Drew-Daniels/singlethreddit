import Comment from '../../factories/comment/comment';
import { collection, doc, getDoc, getDocs, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-setup';
import { COMMENTS_COLLECTION_NAME } from '../../constants';

/**
 * Converter function used to parse data to send to Firestore for writes and instantiating data from Firestore as Comment object.
 */
 const commentConverter = {
    toFirestore: (comment) => {
        const { 
            uid, 
            userName, 
            baseName, 
            body, 
            timeCreated,
            timeEdited,
            upvoters,
            downvoters,
            title,
            userAvatarURL,
            groupAvatarURL,
        } = comment;
        return {
            uid,
            userName,
            baseName,
            body,
            timeCreated,
            timeEdited,
            upvoters,
            downvoters,
            title,
            userAvatarURL,
            groupAvatarURL
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return Comment(data);
    }
}

const commentsRef = collection(db, COMMENTS_COLLECTION_NAME).withConverter(commentConverter);

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
/**
 * Retrieves comment data for a provided Firestore document id and instantiates and returns a Comment object.
 * @param {Firestore document id} id 
 * @returns [Comment object]
 */
async function getComment(id) {
    var comment;
    try {
        const docRef = doc(db, COMMENTS_COLLECTION_NAME, id).withConverter(commentConverter);
        const dSnap = await getDoc(docRef);
        if (dSnap.exists()) {
            comment = dSnap.data();
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
            const comment = await getComment(id);
            if (comment) {
                comments.push(comment);
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
        const comment = c.data();
        comment.id = c.id;
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
function getAllPosts(comments) {
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
 * @param {string} userAvatarURL
 * @param {string} groupAvatarURL
 * @param {string} baseName 
 * @param {string} body 
 * @param {string} parentId 
 * @param {Timestamp} timeCreated 
 * @param {Timestamp} timeEdited 
 * @param {integer} upvoters 
 * @param {integer} downvoters 
 * @param {string} title 
 * @returns [Comment object]
 */
async function addComment(user, groupAvatarURL, baseName, body, parentId, timeCreated, timeEdited, upvoters, downvoters, title) {
    try {
        const { uid, displayName, photoURL } = user;
        const commentData = {
            uid,
            userName: displayName, 
            userAvatarURL: photoURL,
            groupAvatarURL,
            baseName,
            body, 
            parentId, 
            timeCreated, 
            timeEdited, 
            upvoters, 
            downvoters, 
            title
        }
        const comment = Comment(commentData);
        console.log(comment);
        const docRef = await addDoc(commentsRef, comment);
        console.log('Document written w/ ID: ', docRef.id);
        return comment;
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
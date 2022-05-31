import Comment from '../../factories/comment/comment';
import { listen } from '../../utils/db/db';
import { collection, query, orderBy, where, doc, getDoc, getDocs, deleteDoc, addDoc, updateDoc, onSnapshot, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase-setup';
import { COMMENTS_COLLECTION_NAME } from '../../constants';

// COMMENTS
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
function getPosts(comments) {
    comments.filter(comment => comment.parentId === '');
    return comments;
}
function getPostComments(postID, comments) {
    return comments.filter(comment => comment.parentId === postID);
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
        const docRef = await addDoc(commentsRef, comment);
        console.log('Document written w/ ID: ', docRef.id);
        return comment;
    } 
    catch (err) {
        console.error(err);
        return false;
    }
  }

function listenToComments(groups, setCommentsFn, sortField, sortDesc) {
    var q;
    if (groups.length < 1) {
        q = query(commentsRef, orderBy(sortField, (sortDesc ? 'desc': 'asc')));
    } else {
        const groupNames = groups.map(group => group.baseName);
        q = query(commentsRef, where('baseName', 'in', groupNames), orderBy(sortField, (sortDesc ? 'desc': 'asc')));
    }
    const unsubscribe = listen(q, setCommentsFn);
    return unsubscribe;
}

async function upvote(user, comment) {
    if (!user) { return }
    const uid = user.uid;

    const q = query(commentsRef, where('uid', '==', comment.uid), where('timeCreated', '==', comment.timeCreated));
    const docs = await getDocs(q);

    docs.forEach(async (doc) => {
        const ref = doc.ref;
        const batchedUpdates = {};
        if (comment.upvoters.includes(uid)) {
            // user has already upvoted, remove them from upvoters
            batchedUpdates.upvoters = arrayRemove(uid);
        } else {
            // user has not upvoted yet - add them to upvoters
            batchedUpdates.upvoters = arrayUnion(uid);
        }
        if (comment.downvoters.includes(uid)) {
            // ensure that the user is removed from downvoters if they had downvoted the comment previously
            batchedUpdates.downvoters = arrayRemove(uid);
        }
        await updateDoc(ref, batchedUpdates);
    });
}

async function downvote(user, comment) {
    if (!user) { return }
    const uid = user.uid;

    const q = query(commentsRef, where('uid', '==', comment.uid), where('timeCreated', '==', comment.timeCreated));
    const docs = await getDocs(q);

    docs.forEach(async (doc) => {
        const ref = doc.ref;
        const batchedUpdates = {};
        if (comment.downvoters.includes(user.uid)) {
            // user has already downvoted - remove them from downvoters
            batchedUpdates.downvoters = arrayRemove(uid);
        } else {
            // user has not yet downvoted - add them to downvoters
            batchedUpdates.downvoters = arrayUnion(uid);
        }
        if (comment.upvoters.includes(user.uid)) {
            // ensure that the user is removed from upvoters if they had upvoted the comment previously
            batchedUpdates.upvoters = arrayRemove(uid);
        }
        await updateDoc(ref, batchedUpdates);
    })
}

export {
    delComment,
    getComment,
    getComments,
    getAllComments,
    getPosts,
    getPostComments,
    addComment,
    listenToComments,
    updateComment,
    upvote,
    downvote,
}
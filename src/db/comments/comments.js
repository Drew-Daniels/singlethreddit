import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase-setup';

const commentRef = collection(db, 'comments');

async function delComment() {

}

async function getComment() {

}

async function addComment(email, groupName, body, parentId, timeCreated, timeEdited, numUpvotes, numDownvotes, title) {
    const comment = Comment({...arguments})
    await addDoc(commentRef, comment);
}

export {
    delComment,
    addComment,
    getComment,
}
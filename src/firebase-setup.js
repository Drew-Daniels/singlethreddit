import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
/* eslint-disable no-unused-vars */
import * as firebaseui from 'firebaseui';
import { signInWithPopup } from 'firebase/auth';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { fbConfig } from './firebase-config';

const app = initializeApp(fbConfig);
const auth = getAuth(app);
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
function signIn() {
    signInWithPopup(auth, provider);
};
const db = getFirestore(app);
const storage = getStorage(app);

if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', {disableWarnings: true});
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
}

export {
    auth,
    signIn,
    db,
    storage,
}
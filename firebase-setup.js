import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { fbConfig } from './firebase-config';

const app = initializeApp(fbConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'localhost', 9099)
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
}

export {
    db,
    storage,
}
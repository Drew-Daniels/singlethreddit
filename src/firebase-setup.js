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
    connectAuthEmulator(auth, 'http://127.0.0.1:9099')
    connectFirestoreEmulator(db, 'http://127.0.0.1:8080');
    connectStorageEmulator(storage, 'http://127.0.0.1:9199');
}

export {
    auth,
    db,
    storage,
}
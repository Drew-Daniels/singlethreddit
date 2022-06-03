// const { POST_MEDIA_STORAGE_FOLDER_NAME } = require("../src/constants");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { ref, getDownloadURL } = require("firebase/storage");
const app = admin.initializeApp();
const storage = admin.storage();

exports.setKarma = functions.firestore.document("/comments/{documentId}")
    .onWrite((change, context) => {
        const ref = change.after.ref;
        const data = change.after.data();
        if (data) {
            const {upvoters, downvoters} = change.after.data();
            const karma = upvoters.length - downvoters.length;
            return ref.set({karma}, {merge: true});
        }
    }
);

exports.setMediaURL = functions.firestore.document("/comments/{documentId}")
    .onCreate(async (snapshot, context) => {
        const url = 'post-media/' + snapshot.ref.id;
        const storageRef = ref(storage, url);
        console.log(storageRef);
        const mediaURL = await getDownloadURL(storageRef);
        if (mediaURL) {
            return snapshot.ref.set({mediaURL}, {merge: true});
        }
    });

// exports.setAvatarURL = functions.firestore.document("/comments/{documentId}")
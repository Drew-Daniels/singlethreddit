// "firebase-functions" used to create Cloud Functions and set up triggers
const functions = require("firebase-functions");
// "firebase-admin" required to access firestore
const admin = require("firebase-admin");
admin.initializeApp();

exports.getKarma = functions.firestore.document("/comments/{documentId}")
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

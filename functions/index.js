// 'firebase-functions' used to create Cloud Functions and set up triggers
const functions = require("firebase-functions");
// 'firebase-admin' required to access firestore
const admin = require('firebase-admin');
admin.initializeApp();

exports.getKarma = functions.firestore.document('/comments/{documentId}')
    // TODO: See if this function can just be run on after changes to upvoters/downvoters?
    .onWrite((change, context) => {
        const ref = change.after.ref;
        const data = change.after.data();
        if (data) {
            // data will be undefined if the the write update was a delete
            const {upvoters, downvoters} = change.after.data();
            const karma = upvoters.length - downvoters.length;
            return ref.set({ karma }, { merge: true });
        }
    });

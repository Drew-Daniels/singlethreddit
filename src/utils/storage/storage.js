import { storage } from '../../firebase-setup';
import { POST_MEDIA_STORAGE_FOLDER_NAME } from '../../constants';
import { ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";

function getPostMediaStorageRef(postId) {
    return ref(storage, POST_MEDIA_STORAGE_FOLDER_NAME + '/' + postId);
}

async function uploadPostMedia(file, postId) {
    // where to upload to
    const storageRef = getPostMediaStorageRef(postId);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (err) => {
            console.error(err);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
}

/**
 * Seaches Firebase Storage for a file that strictly matches 'fName' - apart from any file extensions it might have.
 * @param {StorageReference} storageRef 
 * @param {string} fName 
 * @returns StorageReference
 */
 async function getFileRef(storageRef, fName) {
    var fileRef;
    const pattern = RegExp(`${fName}` + '.*');
    await listAll(storageRef)
        .then((res) => {
            const files = res.items;
            fileRef = files.filter((itemRef, i) => pattern.test(itemRef.name))[0];
        }).catch((err) => {
            console.error(err);
    });
    return fileRef;
}

async function getStorageURL(storageRef, fName) {
    const ref = await getFileRef(storageRef, fName);
    const match = await getDownloadURL(ref);
    return match;
}

function getPostMediaURL(postId) {
    const ref = getPostMediaStorageRef(postId);
    
    return getDownloadURL(ref)
        .then((url) => {
            return url;
        })
        .catch((err) => {
            const code = err.code;
            switch (code) {
                case 'storage/object-not-found':
                    break;
                default:
                    console.error(err.code);
            }
            return '';
        })
}

export {
    uploadPostMedia,
    getFileRef,
    getStorageURL,
    getPostMediaURL,
}

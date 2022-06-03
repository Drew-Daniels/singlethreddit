import { storage } from '../../firebase-setup';
import { POST_MEDIA_STORAGE_FOLDER_NAME } from '../../constants';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

async function uploadPostMedia(file, postId) {
    // where to upload to
    const storageRef = ref(storage, POST_MEDIA_STORAGE_FOLDER_NAME + '/' + postId);
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

export {
    uploadPostMedia,
}

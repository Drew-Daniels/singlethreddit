import { storage } from '../../firebase-setup';
import { 
    POST_MEDIA_STORAGE_FOLDER_NAME, 
    GROUP_BANNERS_STORAGE_FOLDER_NAME,
    GROUP_AVATARS_STORAGE_FOLDER_NAME,
} from '../../constants';
import { ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";

const getPostMediaStorageRef = (postId) => ref(storage, POST_MEDIA_STORAGE_FOLDER_NAME + '/' + postId);

const groupBannersStorageRef = ref(storage, GROUP_BANNERS_STORAGE_FOLDER_NAME);
const getGroupAvatarStorageRef = (baseName) => ref(storage, GROUP_AVATARS_STORAGE_FOLDER_NAME + '/' + baseName);

const getGroupBannerStorageRef = (baseName) => {
    return getFileRef(groupBannersStorageRef, baseName) 
}
/**
 * Helper function used by uploadGroupAvatar and uploadPostMedia to upload
 * media to Firebase storage
 * @param {groupAvatar || postMedia} type 
 * @param {file} file 
 * @param {baseName || postId} id 
 */
async function uploadMedia(type, file, id) {
    var storageRef;
    if (!(type in ['groupAvatar', 'postMedia'])) { 
        throw new Error('"type" must be either "groupAvatar" or "postMedia"')
    }
    switch (type) {
        case 'groupAvatar':
            storageRef = getGroupAvatarStorageRef(id);
            break;
        case 'postMedia':
            storageRef = getPostMediaStorageRef(id);
            break;
        default:
            break;
    }
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

function uploadGroupAvatar(file, baseName) {
    return uploadMedia('groupAvatar', file, baseName);
}

function uploadPostMedia(file, postId) {
    return uploadMedia('postMedia', file, postId);
}

/**
 * Seaches Firebase Storage for a file that strictly matches 'fName' - apart from any file extensions it might have.
 * @param {StorageReference} storageRef 
 * @param {string} fName 
 * @returns StorageReference
 */
 async function getFileRef(storageRef, fName) {
    const pattern = RegExp(`${fName}` + '.*');
    return listAll(storageRef)
        .then((res) => {
            const files = res.items;
            const ref = files.filter((itemRef, i) => pattern.test(itemRef.name))[0];
            return ref;
        }).catch((err) => {
            console.error(err);
    });
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

async function getGroupBannerURL(baseName) {
    const ref = await getGroupBannerStorageRef(baseName)

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
    uploadGroupAvatar,
    uploadPostMedia,
    getFileRef,
    getStorageURL,
    getPostMediaURL,
    getGroupBannerURL,
}

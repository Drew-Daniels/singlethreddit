import Group from '../../factories/group/group';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage'
import { getFileRef } from '../../utils/get/get';
import { db, storage } from '../../firebase-setup';
import { GROUPS_COLLECTION_NAME, GROUP_AVATARS_STORAGE_FOLDER_NAME } from '../../constants';

const groupsRef = collection(db, GROUPS_COLLECTION_NAME);
const groupAvatarsRef = ref(storage, GROUP_AVATARS_STORAGE_FOLDER_NAME);

/**
 * Deletes a group with the provided baseName.
 * @param {string} baseName 
 * @returns boolean
 */
async function delGroup(baseName) {
    try {
        await deleteDoc(doc(db, GROUPS_COLLECTION_NAME, baseName));
        console.log('Document deleted w/ ID: ', baseName);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

async function getGroup(baseName) {
    try {
        const dRef = doc(db, GROUPS_COLLECTION_NAME, baseName)
        const dSnap = await getDoc(dRef);
        if (dSnap.exists()) {
            const gd = dSnap.data();
            var group = Group(...gd)
        }
        return group;
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * 
 * @param {array} baseNames 
 */
async function getGroups(baseNames) {
    if (!(Array.isArray(baseNames))) { throw new Error('"baseNames" must be an array') };
    try {
        var groups = [];
        baseNames.forEach(async baseName => {
            const dRef = doc(db, GROUPS_COLLECTION_NAME, baseName);
            const dSnap = await getDoc(dRef);
            if (dSnap.exists()) {
                groups.push(dSnap.data());
            }
        });
        return groups;
    }
    catch (err) {
        console.error(err);
    }
}

async function getAllGroups() {
    const groups = [];
    const qSnap = await getDocs(groupsRef);
    qSnap.forEach((g) => {
        const gd = g.data();
        console.log(gd);
        const group = Group(gd)
        groups.push(group);
    })
    console.log(groups);
    return groups;
}

/**
 * Returns the download URL of the group's avatar.
 * @param {string} baseName 
 * @returns string
 */
async function getGroupAvatarDownloadURL(baseName) {
    const avatarRef = await getFileRef(groupAvatarsRef, baseName);
    const match = await getDownloadURL(avatarRef);
    return match;
}

/**
 * Adds a group to Firestore if it does not already exist, otherwise it overwrites. "baseName" is used as the id field.
 * @param {string} baseName 
 * @param {string} displayName 
 * @param {string} description 
 * @param {integer} timeCreated 
 * @param {array} members 
 */
async function setGroup(baseName, displayName, description, members) {
    const group = Group({
        baseName,
        displayName,
        description,
        timeCreated: serverTimestamp(),
        members
    });
    try {
        const dRef = await setDoc(doc(db, GROUPS_COLLECTION_NAME, baseName), group);
        console.log('Document written w/ ID: ', dRef.id);
        return true;
    } 
    catch (err) {
        console.error(err);
        return false;
    }
}

export {
    delGroup,
    getGroup,
    getGroups,
    getAllGroups,
    getGroupAvatarDownloadURL,
    setGroup,
}
import Group from '../../factories/group/group';
import { collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage'
import { getFileRef } from '../../utils/get/get';
import { db, storage } from '../../firebase-setup';
import { GROUPS_COLLECTION_NAME, GROUP_AVATARS_STORAGE_FOLDER_NAME } from '../../constants';

const groupsRef = collection(db, GROUPS_COLLECTION_NAME);
const groupAvatarsRef = ref(storage, GROUP_AVATARS_STORAGE_FOLDER_NAME);

const groupConverter = {
    toFirestore: (group) => {
        return {
            baseName: group.baseName,
            displayName: group.displayName,
            description: group.description,
            timeCreated: group.timeCreated,
            members: group.members
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return Group(data);
    }
}

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
    var group;
    try {
        const dRef = doc(db, GROUPS_COLLECTION_NAME, baseName).withConverter(groupConverter);
        const dSnap = await getDoc(dRef);
        if (dSnap.exists()) {
            group = dSnap.data();
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
            const group = getGroup(baseName);
            if (group) {
                groups.push(group);
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
        const group = Group(gd)
        groups.push(group);
    });
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
 * Adds a group to Firestore and returns the Group object.
 * @param {string} baseName 
 * @param {string} displayName 
 * @param {string} description 
 * @param {integer} timeCreated 
 * @param {array} members 
 * @returns [Group object]
 */
async function addGroup(baseName, displayName, description, members) {
    try {
        const group = Group({
            baseName,
            displayName,
            description,
            timeCreated: serverTimestamp(),
            members
        });
        const dRef = await addDoc(doc(db, GROUPS_COLLECTION_NAME), group).withConverter(groupConverter)
        console.log('Document written w/ ID: ', dRef.id);
        return group;
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
    addGroup
}
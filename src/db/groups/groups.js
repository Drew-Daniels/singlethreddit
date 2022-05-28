import Group from '../../factories/group/group';
import { collection, where, query, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage'
import { getFileRef } from '../../utils/get/get';
import { listen } from '../../utils/db/db';
import { db, storage } from '../../firebase-setup';
import { GROUPS_COLLECTION_NAME, GROUP_AVATARS_STORAGE_FOLDER_NAME } from '../../constants';

// GROUPS
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
  const groupsRef = collection(db, GROUPS_COLLECTION_NAME).withConverter(groupConverter);
  const groupAvatarURLsRef = ref(storage, GROUP_AVATARS_STORAGE_FOLDER_NAME);

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
        const dRef = doc(db, GROUPS_COLLECTION_NAME, baseName);
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
        const group = g.data();
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
    const avatarRef = await getFileRef(groupAvatarURLsRef, baseName);
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
        const groupData = {
            baseName,
            displayName,
            description,
            timeCreated: serverTimestamp(),
            members
        }
        const group = Group(groupData);
        const dRef = await addDoc(doc(db, GROUPS_COLLECTION_NAME), group)
        console.log('Document written w/ ID: ', dRef.id);
        return group;
    } 
    catch (err) {
        console.error(err);
        return false;
    }
}

function listenToGroups(user, setGroupsFn) {
    const q = user ? query(groupsRef, where('members', 'array-contains', user.uid)): query(groupsRef);
    const unsubscribe = listen(q, setGroupsFn);
    return unsubscribe;
}

export {
    delGroup,
    getGroup,
    getGroups,
    getAllGroups,
    listenToGroups,
    getGroupAvatarDownloadURL,
    addGroup
}
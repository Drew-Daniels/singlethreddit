import Group from '../../factories/group/group';
import { collection, where, query, doc, getDoc, getDocs, addDoc, updateDoc, arrayUnion, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref } from 'firebase/storage'
import { getStorageURL } from '../../utils/storage/storage';
import { listen } from '../../utils/db/db';
import { db, storage } from '../../firebase-setup';
import { 
    GROUPS_COLLECTION_NAME, 
    GROUP_AVATARS_STORAGE_FOLDER_NAME,
    GROUP_BANNERS_STORAGE_FOLDER_NAME,
} from '../../constants';

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
  const groupBannerURLsRef = ref(storage, GROUP_BANNERS_STORAGE_FOLDER_NAME);

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
    const url = await getStorageURL(groupAvatarURLsRef, baseName);
    return url;
}

async function getGroupBannerDownloadURL(baseName) {
    const url = await getStorageURL(groupBannerURLsRef, baseName);
    return url;
}


/**
 * Adds a group to Firestore and returns the Group object.
 * @param {string} baseName 
 * @param {string} displayName 
 * @param {string} description 
 * @param {integer} timeCreated 
 * @param {array} members 
 * @param {array} rules 
 * @returns [Group object]
 */
async function addGroup(baseName, displayName, description, members, rules) {
    try {
        const groupData = {
            baseName,
            displayName,
            description,
            timeCreated: serverTimestamp(),
            members,
            rules
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

function listenToGroups(setGroupsFn) {
    const q = query(groupsRef);
    const unsubscribe = listen(q, setGroupsFn);
    return unsubscribe;
}

function listenToUserGroups(user, setUserGroupsFn) {
    const q = user ? query(groupsRef, where('members', 'array-contains', user.uid)): query(groupsRef);
    const unsubscribe = listen(q, setUserGroupsFn);
    return unsubscribe;
}

async function addUserToGroup(user, group) {
    if (!user) { return };
    const q = query(groupsRef, where('baseName', '==', group.baseName));
    const docs = await getDocs(q);
    docs.forEach(async (doc) => {
        await updateDoc(doc.ref, {
            members: arrayUnion(user.uid)
        });
    })
}

export {
    delGroup,
    getGroup,
    getGroups,
    getAllGroups,
    listenToGroups,
    listenToUserGroups,
    getGroupAvatarDownloadURL,
    getGroupBannerDownloadURL,
    addGroup,
    addUserToGroup,
}
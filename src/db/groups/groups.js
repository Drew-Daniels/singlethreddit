import Group from '../../factories/group/group';
import { collection, where, query, doc, getDoc, getDocs, setDoc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage'
import { getStorageURL } from '../../utils/storage/storage';
import { listen } from '../../utils/db/db';
import { db, storage } from '../../firebase-setup';
import { 
    GROUPS_COLLECTION_NAME, 
    GROUP_AVATARS_STORAGE_FOLDER_NAME,
    GROUP_BANNERS_STORAGE_FOLDER_NAME,
    TEST_GROUPS
} from '../../constants';

// GROUPS
const groupConverter = {
    toFirestore: (group) => {
        const {baseName, displayName, description, timeCreated, members, rules} = group;
        return {
            baseName,
            displayName,
            description,
            timeCreated,
            members,
            rules,
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
    try {
        let group;
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
    if (!(Array.isArray(baseNames))) { throw new Error('"baseNames" must be an array') }
    try {
        let groups = [];
        await Promise.all(baseNames.map(async (baseName) => {
            const group = await getGroup(baseName);
            if (group) {
                groups.push(group);
            }
        }));
        return groups;
    }
    catch (err) {
        console.error(err);
    }
}

function getGroupAvatarDownloadURL(baseName) {
    return getStorageURL(groupAvatarURLsRef, baseName);
}

function getGroupBannerDownloadURL(baseName) {
    return getStorageURL(groupBannerURLsRef, baseName);
}


/**
 * Adds a group to Firestore and returns the Group object.
 * @param {string} baseName 
 * @param {string} displayName 
 * @param {string} description 
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
            members,
            rules
        }
        const group = Group(groupData);
        const dRef = doc(db, GROUPS_COLLECTION_NAME, baseName).withConverter(groupConverter);
        await setDoc(dRef, group)
        console.log('Document written w/ ID: ', baseName);
        return group;
    } 
    catch (err) {
        console.error(err);
        return false;
    }
}

function listenToGroups(setGroupsFn) {
    const q = query(groupsRef);
    return listen(q, setGroupsFn);
}

function listenToUserGroups(user, setUserGroupsFn) {
    const q = user ? query(groupsRef, where('members', 'array-contains', user.uid)): query(groupsRef);
    return listen(q, setUserGroupsFn);
}

async function addUserToGroup(user, group) {
    if (!user) { return }
    const q = query(groupsRef, where('baseName', '==', group.baseName));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
        updateDoc(doc.ref, {
            members: arrayUnion(user.uid)
        });
    })
}

function populateGroups(groups=TEST_GROUPS) {
    return Promise.all(groups.map((group) => {
        const args = [...Object.values(group)];
        return addGroup(...args);
    }));
}

export {
    delGroup,
    getGroup,
    getGroups,
    populateGroups,
    listenToGroups,
    listenToUserGroups,
    getGroupAvatarDownloadURL,
    getGroupBannerDownloadURL,
    addGroup,
    addUserToGroup,
}
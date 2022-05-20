import Group from '../../factories/group/group';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-setup';
import { GROUPS_COLLECTION_NAME } from '../../constants';

const groupsRef = collection(db, GROUPS_COLLECTION_NAME);

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
            var group = Group({
                baseName: gd.base_name,
                displayName: gd.display_name,
                description: gd.description,
                timeCreated: gd.time_created,
                members: gd.members
            })
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
        const group = Group({
            baseName: gd.base_name,
            displayName: gd.display_name,
            description: gd.description,
            timeCreated: gd.time_created,
            members: gd.members
        })
        groups.push(group);
    })
    return groups;
}

/**
 * Adds a group to Firestore if it does not already exist, otherwise it overwrites. "baseName" is used as the id field.
 * @param {string} baseName 
 * @param {string} displayName 
 * @param {string} description 
 * @param {integer} timeCreated 
 * @param {array} members 
 */
async function setGroup(baseName, displayName, description, timeCreated, members) {
    const group = Group({
        baseName,
        displayName,
        description,
        timeCreated,
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
    setGroup,
}
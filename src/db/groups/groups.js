import Group from '../../factories/group/group';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-setup';

const groupRef = collection(db, 'groups');

async function delGroup() {
    
}

async function addGroup() {
    const group = Group(...arguments)
}

async function getGroup() {

}

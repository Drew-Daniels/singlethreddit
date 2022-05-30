import { onSnapshot } from "firebase/firestore";

export async function listen(query, setterFn) {
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
        docs.push(doc.data());
        });
        setterFn(prev => docs);
    });
    return Promise.resolve(unsubscribe);
}
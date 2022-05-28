import { onSnapshot } from "firebase/firestore";

export function listen(query, setterFn) {
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
        docs.push(doc.data());
        });
        setterFn(prev => docs);
    });
    return unsubscribe;
}
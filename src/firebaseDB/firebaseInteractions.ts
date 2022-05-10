import { getDatabase, ref, set, get, update } from "firebase/database";

export function setUserDataFirebase(dbName: string, payload: any) {
    const db = getDatabase();
    set(ref(db, dbName), payload);
};

export function getDataFirebase(name: string) {
    const db = getDatabase();
    return get(ref(db, name))
        .then((snapshot: any) => {
            if (snapshot.exists()) {
                return snapshot.val();
            };
            return [];
        });
};

export function updateDataFirebase(name: string, tasks: any) {
    const db = getDatabase();
    const updates: any = {};
    updates[name] = tasks;
    return update(ref(db), updates);
};
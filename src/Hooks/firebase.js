import firebase from 'firebase';
import { useState, useEffect } from 'react';
import 'firebase/storage';

const config = {
    apiKey: 'AIzaSyCtSXpHE4lvjfjQ3R03JRTUE1z9K3Iw6Lg',
    authDomain: 'vici-news.firebaseapp.com',
    projectId: 'vici-news',
    storageBucket: 'vici-news.appspot.com',
    messagingSenderId: '313330293720',
    appId: '1:313330293720:web:e5df05a37512bc149470ad',
    measurementId: 'G-X17441MMR0',
};

export const useFirebase = () => {
    const [state, setState] = useState({ firebase });

    useEffect(() => {
        let app;
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        let auth = firebase.auth(app);
        let firestore = firebase.firestore(app);
        let storage = firebase.storage(app);
        let database = firebase.database(app);
        let googleProvider = new firebase.auth.GoogleAuthProvider();

        setState({
            firebase,
            firestore,
            app,
            auth,
            storage,
            database,
            googleProvider,
        });
    }, []);

    return state;
};

export const useDoc = (path) => {
    const { firestore } = useFirebase();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // if (!firestore) {
        //     return;
        // }
        if (!firestore) {
            return;
        }
        firestore.doc(path).onSnapshot((doc) => {
            setData({ id: doc.id, ...doc.data() });
            console.log(data, 'data');
            setLoading(false);
        });

        //  return subscribe();
    }, [firestore, path]);

    const updateRecord = (data) => {
        return firestore.doc(path).set({ ...data }, { merge: true });
    };

    const deleteRecord = (path) => {
        return firestore.doc(path).delete();
    };

    const readAgain = () => {
        firestore
            .doc(path)
            .get()
            .then(function (doc) {
                setData(doc.data());
            })
            .catch(function (error) {
                console.log('Error getting cached document:', error);
            });
    };

    return { data, loading, updateRecord, deleteRecord, readAgain };
};

export const useCol = (path, sort = false) => {
    const { firestore } = useFirebase();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (firestore && path) {
            let query = firestore.collection(path);
            let order = sort ? query.orderBy('createdAt', 'asc') : query;

            const unsubscribe = order.onSnapshot((querySnapshot) => {
                setData(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
                console.log(data);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [firestore, path, sort]);

    const updateRecord = (id, data) => {
        if (firestore)
            return firestore
                .collection(path)
                .doc(id)
                .set(
                    {
                        ...data,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    },
                    {
                        merge: true,
                    }
                );
        else return null;
    };

    const createRecord = (id, data) => {
        if (id === '') {
            return firestore
                .collection(path)
                .doc()
                .set(
                    {
                        ...data,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    },
                    {
                        merge: true,
                    }
                );
        }
        return firestore
            .collection(path)
            .doc(id)
            .set(
                {
                    ...data,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                },
                {
                    merge: true,
                }
            );
    };

    const deleteRecord = (id) => {
        return firestore.collection(path).doc(id).delete();
    };

    return { data, loading, updateRecord, deleteRecord, createRecord };
};

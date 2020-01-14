import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//documentRef.XXXX() -> set, get, update, delete

const config = {
    apiKey: "AIzaSyAR9yHedFgoSjo_RsTLSpHRHQdOXSet3bE",
    authDomain: "crwn-db-b40c1.firebaseapp.com",
    databaseURL: "https://crwn-db-b40c1.firebaseio.com",
    projectId: "crwn-db-b40c1",
    storageBucket: "crwn-db-b40c1.appspot.com",
    messagingSenderId: "1070936331277",
    appId: "1:1070936331277:web:8a21f7f10a19b6b8707144",
    measurementId: "G-WCCBLQJ0E1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    //const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();
    //const collectionSnapshot = await collectionRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            //create user
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message );
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc(obj.title);
        batch.set(newDocRef, obj);
    });

    return await batch.commit()
};

//Mapping Firebase collection
export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
        const { title, items } = docSnapshot.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

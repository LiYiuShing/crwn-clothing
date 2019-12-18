import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD5tSSJZXPnwyT615v_r9MxCLNE4Vy8dA0",
    authDomain: "crwn-db-62241.firebaseapp.com",
    databaseURL: "https://crwn-db-62241.firebaseio.com",
    projectId: "crwn-db-62241",
    storageBucket: "crwn-db-62241.appspot.com",
    messagingSenderId: "542157934395",
    appId: "1:542157934395:web:39e217c28976709ad0f11e"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
        });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const collectionName: string = import.meta.env.VITE_FIREBASE_COLLECTION_NAME

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider()

export { collectionName, db, auth, googleAuthProvider, signInWithPopup, analytics }
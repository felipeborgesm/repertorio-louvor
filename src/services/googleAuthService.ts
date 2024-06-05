import { auth, googleAuthProvider, signInWithPopup } from '../firebaseConfig';

export async function authGoogle(): Promise<boolean> {
    try {
        await signInWithPopup(auth, googleAuthProvider);
        console.log("User signed in with Google successfully");
        return true
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        return false
    }
}
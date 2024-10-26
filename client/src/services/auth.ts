import { 
    GoogleAuthProvider, 
    getAuth, 
    signInWithRedirect, 
    getRedirectResult, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut 
} from "@firebase/auth";
import app from './firebase'
import { axiosInstance } from "./axios";

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
    
export const logInWithGoogle = () => {
    signInWithRedirect(auth, provider)
    getRedirectResult(auth)
        .then((result) => {
            const user = result?.user;
            console.log('sign in successfull!')
            console.log(user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
} 

export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        console.log('sign in successfull!')
        return true
    } catch(error) {
        console.log(error)
    }

    return false
}

export const register = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log('sign up successfull!')
        return true
    } catch(error) {
        console.log(error)
    }

    return false
}

export const serverAuth = async (uid: string) => {
    try {
        await axiosInstance.post('/login', { uid: uid })
        return true
    } catch(e) {
        return false
    }
}

export const logOut = () => {
    signOut(auth).then(() => {
        console.log('successfully signed out')
    }).catch((error) => {
        console.log(error)
    });
}
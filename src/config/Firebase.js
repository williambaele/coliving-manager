import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyARNrHH1zMW01CUK951IMwQ6JEP7asZrzY",
    authDomain: "test-df0ac.firebaseapp.com",
    projectId: "test-df0ac",
    storageBucket: "test-df0ac.appspot.com",
    messagingSenderId: "508805429647",
    appId: "1:508805429647:web:3dd6b7025f8a9f779533fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

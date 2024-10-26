import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDrJUnXudpZMt8Sklka3AXiir_8Z_UgcuM",
    authDomain: "stock-tracker-19bd1.firebaseapp.com",
    projectId: "stock-tracker-19bd1",
    storageBucket: "stock-tracker-19bd1.appspot.com",
    messagingSenderId: "41654487338",
    appId: "1:41654487338:web:a006096e23420980d5b653"
};
 
const app = initializeApp(firebaseConfig);

export default app;
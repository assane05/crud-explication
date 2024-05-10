import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-BGGSmMOgZUOStxZqmyuYRJHgWTOuyQ8",
  authDomain: "crup-app-explication.firebaseapp.com",
  projectId: "crup-app-explication",
  storageBucket: "crup-app-explication.appspot.com",
  messagingSenderId: "416174726197",
  appId: "1:416174726197:web:44042439f6bbb751e5a57c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireDb = getFirestore(app);

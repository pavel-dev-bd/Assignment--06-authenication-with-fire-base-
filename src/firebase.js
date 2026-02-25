import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHQll-p8D5oacHIz-mn9OAxNnU_jPLHTo",
  authDomain: "fire-auth-6b53a.firebaseapp.com",
  databaseURL: "https://fire-auth-6b53a-default-rtdb.firebaseio.com",
  projectId: "fire-auth-6b53a",
  storageBucket: "fire-auth-6b53a.firebasestorage.app",
  messagingSenderId: "882517861729",
  appId: "1:882517861729:web:c8c01f56ef0cb0fc8cd120",
  measurementId: "G-5MH435WDN4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
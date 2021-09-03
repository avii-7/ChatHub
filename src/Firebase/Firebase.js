import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPXHnZMULe3LGHnHDdSHiXELjHk_tUsFE",
  authDomain: "chathub-avii.firebaseapp.com",
  projectId: "chathub-avii",
  storageBucket: "chathub-avii.appspot.com",
  messagingSenderId: "121548243057",
  appId: "1:121548243057:web:bbdbda5c9c354678b61bd0",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export default db;

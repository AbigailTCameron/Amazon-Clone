import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBc_HB92RToMxzAy0qiRacL9WvvH21pKMk",
  authDomain: "clone-e6e66.firebaseapp.com",
  projectId: "clone-e6e66",
  storageBucket: "clone-e6e66.appspot.com",
  messagingSenderId: "907140476354",
  appId: "1:907140476354:web:215f21d30f457b02ecba5b",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPfYUO1cmkrVsXvFC7OTvjiN1gGQXxZTk",
  authDomain: "ada-tp-final-2a1b4.firebaseapp.com",
  databaseURL: "https://ada-tp-final-2a1b4.firebaseio.com",
  projectId: "ada-tp-final-2a1b4",
  storageBucket: "ada-tp-final-2a1b4.appspot.com",
  messagingSenderId: "1052087504901",
  appId: "1:1052087504901:web:c66c60bb152c2b45ca0c6c",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default app;
export { db };

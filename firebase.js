import "firebase/auth";
import "firebase/firestore";

import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAN3GTmttIfs2FE4xQvHOsm8LYxPIoTceY",
    authDomain: "maptask-3306e.firebaseapp.com",
    projectId: "maptask-3306e",
    storageBucket: "maptask-3306e.appspot.com",
    messagingSenderId: "984765000308",
    appId: "1:984765000308:web:c540ebdd1d3de25f9b3f21"
  };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBvRa5484FDlf8P_N0PS2UMUyPKPOxrpKg",
  authDomain: "my-do-todo.firebaseapp.com",
  databaseURL: "https://my-do-todo.firebaseio.com",
  projectId: "my-do-todo",
  storageBucket: "my-do-todo.appspot.com",
  messagingSenderId: "946769456896",
  appId: "1:946769456896:web:8fb715e14d9e4950b10de5",
  measurementId: "G-PSQ44MZ19K"
});

const db = firebaseApp.firestore();

export default db;
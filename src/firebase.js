import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVwSlh-ziaXeCQsLIWV8cGJl104VbYBV0",
    authDomain: "messaging-app-cf251.firebaseapp.com",
    projectId: "messaging-app-cf251",
    storageBucket: "messaging-app-cf251.appspot.com",
    messagingSenderId: "344853546528",
    appId: "1:344853546528:web:b789eaddd19b1de5b55e45",
    measurementId: "G-Q21E5MCPBG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider };

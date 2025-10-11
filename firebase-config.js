// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxYdeuSTnqdDoGCaTqiUKgQxWTK17XPnY",
    authDomain: "desafio-rops-app.firebaseapp.com",
    projectId: "desafio-rops-app",
    storageBucket: "desafio-rops-app.firebasestorage.app",
    messagingSenderId: "550720910361",
    appId: "1:550720910361:web:e9a40c6f348e729f432688"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Configure Google Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

console.log('Firebase initialized successfully');


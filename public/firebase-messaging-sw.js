importScripts(
  "https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBTG8e0-Zh3YwbuFPKgoDraL1jO39fBUJM",
  authDomain: "medication-management-ap-506be.firebaseapp.com",
  projectId: "medication-management-ap-506be",
  storageBucket: "medication-management-ap-506be.firebasestorage.app",
  messagingSenderId: "486357535988",
  appId: "1:486357535988:web:7196e39d5430ab5450e2a1"
};

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

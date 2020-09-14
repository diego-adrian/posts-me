var firebaseConfig = {
  apiKey: "AIzaSyDHGx-1Q2C-N7n357wwsMWe1v2DpjpTHHI",
  authDomain: "pwa-postme.firebaseapp.com",
  databaseURL: "https://pwa-postme.firebaseio.com",
  projectId: "pwa-postme",
  storageBucket: "pwa-postme.appspot.com",
  messagingSenderId: "849347905353",
  appId: "1:849347905353:web:0f2e9ad30d00c1474a3c98",
  measurementId: "G-63D0W2GLBT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storageRef = firebase.storage().ref(); 
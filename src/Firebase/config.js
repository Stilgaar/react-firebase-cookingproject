import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBDNLRoUm3-pMLxnLW6_-cpDsOnwfEqeLk",
    authDomain: "cooking-papa-site.firebaseapp.com",
    projectId: "cooking-papa-site",
    storageBucket: "cooking-papa-site.appspot.com",
    messagingSenderId: "95469497782",
    appId: "1:95469497782:web:e9470e45fc67ed0b9a2517",
    measurementId: "G-HXPRBQX2MQ"
};

// init fb 
firebase.initializeApp(firebaseConfig)

// init services
const projetFirestore = firebase.firestore()

export { projetFirestore }
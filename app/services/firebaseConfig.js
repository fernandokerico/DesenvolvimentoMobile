// app/services/firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// 🔑 Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZO2HJi1sPjQ5cLcfKE-1tka5X641fLpQ",
  authDomain: "controle-gastos-8b0aa.firebaseapp.com",
  projectId: "controle-gastos-8b0aa",
  storageBucket: "controle-gastos-8b0aa.appspot.com",
  messagingSenderId: "81043496885",
  appId: "1:81043496885:android:0c687165857ed870ba43fc"
};

// Inicializa o Firebase apenas uma vez
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// 🔥 Exporte os serviços que você for usar
const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };

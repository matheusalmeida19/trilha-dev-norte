// firebase-config.js (ou o nome que você deu ao seu arquivo de configuração)

// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Opcional, se estiver usando Analytics
import { getAuth } from "firebase/auth"; // <-- IMPORTANTE: Importe getAuth

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMKWLVOvswkRXT46h8xdBJTP9JwPJbC50", // Sua chave API real
  authDomain: "trilha-dev-norte.firebaseapp.com",
  projectId: "trilha-dev-norte",
  storageBucket: "trilha-dev-norte.firebasestorage.app",
  messagingSenderId: "407164778288",
  appId: "1:407164778288:web:a315098492f4c3e8c33af5",
  measurementId: "G-EY35EF1BQX" // Opcional, se estiver usando Analytics
};
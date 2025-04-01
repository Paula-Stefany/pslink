// Importando o App e inicializando o APp com as configurações que o firebase deu

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCJuCSQVjlDmb6hJd5jgI_Y-qMRIp4AuiM",
  authDomain: "pslinks-f3820.firebaseapp.com",
  projectId: "pslinks-f3820",
  storageBucket: "pslinks-f3820.firebasestorage.app",
  messagingSenderId: "318792219615",
  appId: "1:318792219615:web:a3c63f667c2680cd41226a"
};

// Inicializando o app, o auth e o database
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar as configurações para conseguirmos utilizar em outros arquivos.

export { auth, db };

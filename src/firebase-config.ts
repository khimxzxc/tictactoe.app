import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDbDRgZFSAiiulBaQgPPcnUz_PMgno9Q0o",
    authDomain: "tgminigame-196c7.firebaseapp.com",
    projectId: "tgminigame-196c7",
    storageBucket: "tgminigame-196c7.firebasestorage.app",
    messagingSenderId: "522289019652",
    appId: "1:522289019652:web:f17fe9547046c8ec506e51",
    measurementId: "G-N5K5XEJFPD"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

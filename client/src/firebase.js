// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-f73ad.firebaseapp.com',
  projectId: 'mern-estate-f73ad',
  storageBucket: 'mern-estate-f73ad.appspot.com',
  messagingSenderId: '1015872996418',
  appId: '1:1015872996418:web:edbf01fcabcd45911c19db',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

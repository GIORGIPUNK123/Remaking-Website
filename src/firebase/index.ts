// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyA_2RraEpplw7wNgRx4fmL4AScqZBiFvno',
  authDomain: 'e-commerce-47bb4.firebaseapp.com',
  projectId: 'e-commerce-47bb4',
  storageBucket: 'e-commerce-47bb4.appspot.com',
  messagingSenderId: '158391374091',
  appId: '1:158391374091:web:49e845ee46588046f8d20e',
  measurementId: 'G-47LSP56B7F',
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

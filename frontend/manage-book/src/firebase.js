// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDLke9_pfOgoTPnyac1VPZ14nVbEB0F-M",
  authDomain: "book-upload-img.firebaseapp.com",
  projectId: "book-upload-img",
  storageBucket: "book-upload-img.appspot.com",
  messagingSenderId: "325543787938",
  appId: "1:325543787938:web:51ab70d606e61d74b3c6fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlyh91MYaO-u7bB-CuZjmdxUUXEiaS70g",
  authDomain: "fashion-3190c.firebaseapp.com",
  projectId: "fashion-3190c",
  storageBucket: "fashion-3190c.appspot.com",
  messagingSenderId: "78307742079",
  appId: "1:78307742079:web:8e2576d943a44a7f94ca4a",
  measurementId: "G-HW01X6M9E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
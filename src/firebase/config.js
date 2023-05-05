// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAN_Grgh8gfKOQ0tcyLfhnY0msS_2K1DA",
  authDomain: "reactnativeapp-sh1801.firebaseapp.com",
  projectId: "reactnativeapp-sh1801",
  storageBucket: "reactnativeapp-sh1801.appspot.com",
  messagingSenderId: "1081837600637",
  appId: "1:1081837600637:web:4bc2f37da2100894b71614",
  measurementId: "G-7TM4VRJ2FW",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBddMR04dceKTiiXDczDzorAMg_SQkNWJo",
  authDomain: "react-native-b5e8c.firebaseapp.com",
  projectId: "react-native-b5e8c",
  storageBucket: "react-native-b5e8c.appspot.com",
  messagingSenderId: "283214230262",
  appId: "1:283214230262:web:3286003ca114f184a532d7"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

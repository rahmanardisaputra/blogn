import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

export default defineNuxtPlugin(async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDdgJiolWkWaGLD6x6qDjUURK8F04AEoqA",
    authDomain: "woka-tutorial.firebaseapp.com",
    projectId: "woka-tutorial",
    storageBucket: "woka-tutorial.firebasestorage.app",
    messagingSenderId: "824189947102",
    appId: "1:824189947102:web:0810dd4c7d21496ca3064f"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);

  // 🔥 PAKSA AUTH TETAP LOGIN MESKI REFRESH
  await setPersistence(auth, browserLocalPersistence);

  return {
    provide: { db, auth }
  };
});


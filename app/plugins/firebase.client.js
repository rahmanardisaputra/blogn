import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  onAuthStateChanged
} from "firebase/auth";

import { useAuth } from "@/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDdgJiolWkWaGLD6x6qDjUURK8F04AEoqA",
    authDomain: "woka-tutorial.firebaseapp.com",
    projectId: "woka-tutorial",
    storageBucket: "woka-tutorial.firebasestorage.app",
    messagingSenderId: "824189947102",
    appId: "1:824189947102:web:0810dd4c7d21496ca3064f"
  };

  // init firebase
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);

  // 🔥 Pastikan user TIDAK logout meski refresh
  await setPersistence(auth, browserLocalPersistence);

  // ================================================
  // 🔥 SUPER PENTING: Sinkronkan Firebase → useAuth()
  // ================================================
  const { setUser } = useAuth();

  onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser); // simpan user ke state Nuxt
  });

  return {
    provide: { db, auth }
  };
});

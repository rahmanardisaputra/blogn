import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@/composables/useAuth";

export default defineNuxtPlugin((nuxtApp) => {
  const { $auth } = nuxtApp;
  const { setUser } = useAuth();

  // Pastikan auth sudah ada
  if (!$auth) {
    console.warn("Auth belum siap");
    return;
  }

  let firstLoad = true;

  onAuthStateChanged($auth, (user) => {
    setUser(user || null);

    // ⛔ Jangan redirect-login sampai listener selesai load
    if (firstLoad) {
      firstLoad = false;
      return;
    }
  });
});

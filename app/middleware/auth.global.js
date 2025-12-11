export default defineNuxtRouteMiddleware((to, from) => {
  const { user, loading } = useAuth();

  // ⛔ Jangan lakukan apa pun sebelum Firebase selesai load sesi login
  if (loading.value) {
    return;
  }

  // daftar halaman admin yang butuh login
  const protectedRoutes = [
    "/categories",
    "/posts",
  ];

  const isProtected = protectedRoutes.some(r => to.path.startsWith(r));

  // jika halaman admin tapi belum login → arahkan ke login
  if (isProtected && !user.value) {
    return navigateTo("/login");
  }
});

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();

  // Jika user belum diketahui (masih null tapi belum load Firebase), jangan blokir dulu
  if (user.value === undefined) {
    return;
  }

  const protectedRoutes = [
    "/categories",
    "/posts"
  ];

  if (protectedRoutes.some(r => to.path.startsWith(r))) {
    if (!user.value) {
      return navigateTo("/login");
    }
  }
});

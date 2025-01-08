function isAuthenticated(): boolean {
  const userStore = useUserStore();
  return !!userStore?.user?.user_id && userStore?.user?.group === "Standard";
}
export default defineNuxtRouteMiddleware((to, from) => {
  if (isAuthenticated() === false) {
    return navigateTo("/login");
  }
});

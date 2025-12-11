export const useAuth = () => {
  const user = useState("user", () => null);  
  const loading = useState("authLoading", () => true);

  const setUser = (val) => {
    user.value = val;
    loading.value = false;
  };

  return { user, setUser, loading };
};

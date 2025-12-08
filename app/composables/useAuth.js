export const useAuth = () => {
  const user = useState("user", () => undefined); // ← bukan null

  const setUser = (val) => {
    user.value = val;
  };

  return { user, setUser };
};

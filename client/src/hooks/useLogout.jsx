import useAuthContext from "./useAuthContext.jsx";

export default function useLogout() {
  const { dispatch } = useAuthContext();

  function logout() {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }

  return logout;
}

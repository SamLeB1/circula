import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthContext from "./useAuthContext.jsx";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  async function login(username, password) {
    setIsLoading(true);
    setErrMessage(null);
    axios
      .post(`${import.meta.env.VITE_SERVER}/auth/login`, { username, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setErrMessage(err.response.data.msg);
      })
      .finally(() => setIsLoading(false));
  }

  return { login, isLoading, errMessage };
}

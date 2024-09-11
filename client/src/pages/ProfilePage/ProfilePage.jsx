import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/users/${username}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [username]);

  if (!user && isLoading) return <></>;
  else if (!user && !isLoading) return <NotFoundPage />;
  else
    return (
      <h1>
        {user.firstName} {user.lastName} @{user.username}
      </h1>
    );
}

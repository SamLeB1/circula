import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import usePostsContext from "../../hooks/usePostsContext.jsx";
import ProfileHeader from "../../components/profile/ProfileHeader/ProfileHeader.jsx";
import ProfileOverview from "../../components/profile/ProfileOverview/ProfileOverview.jsx";
import ProfilePosts from "../../components/profile/ProfilePosts/ProfilePosts.jsx";
import ProfileAbout from "../../components/profile/ProfileAbout/ProfileAbout.jsx";
import ProfileFriends from "../../components/profile/ProfileFriends/ProfileFriends.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [tab, setTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/users/${username}`)
      .then((res) => {
        setUser(res.data);
        return axios.get(
          `${import.meta.env.VITE_SERVER}/posts?userId=${res.data._id}`
        );
      })
      .then((res) => dispatch({ type: "SET", payload: res.data.reverse() }))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [username]);

  if (!user && isLoading) return <></>;
  else if (!user && !isLoading) return <NotFoundPage />;
  else
    return (
      <div className="profile-page">
        <ProfileHeader user={user} setTab={setTab} />
        {tab === "overview" && <ProfileOverview />}
        {tab === "posts" && <ProfilePosts posts={posts} />}
        {tab === "about" && <ProfileAbout />}
        {tab === "friends" && <ProfileFriends />}
      </div>
    );
}

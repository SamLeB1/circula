import axios from "axios";
import useAuthContext from "./useAuthContext.jsx";
import usePostsContext from "./usePostsContext.jsx";
import usePostModalContext from "./usePostModalContext.jsx";

export default function useDeletePost() {
  const { user } = useAuthContext();
  const { dispatch: dispatchPosts } = usePostsContext();
  const { dispatch: dispatchPostModal } = usePostModalContext();

  function deletePost(postId) {
    axios
      .delete(`${import.meta.env.VITE_SERVER}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        dispatchPosts({ type: "REMOVE", payload: postId });
        dispatchPostModal({ type: "CLOSE" });
      })
      .catch((err) => console.error(err));
  }

  return deletePost;
}

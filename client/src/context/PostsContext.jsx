import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export function postsReducer(state, action) {
  switch (action.type) {
    case "SET":
      return { posts: action.payload };
    case "ADD":
      return { posts: [action.payload, ...state.posts] };
    case "REMOVE":
      return {
        posts: state.posts.filter((post) => {
          return post._id !== action.payload;
        }),
      };
    default:
      return state;
  }
}

export function PostsContextProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, { posts: [] });

  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
}

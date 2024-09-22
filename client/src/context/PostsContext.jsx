import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export function postsReducer(state, action) {
  switch (action.type) {
    case "SET":
      return { posts: action.payload };
    case "ADD":
      return { posts: [action.payload, ...state.posts] };
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

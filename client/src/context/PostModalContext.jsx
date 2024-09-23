import { createContext, useReducer } from "react";

export const PostModalContext = createContext();

export function postModalReducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return { postId: action.payload, isOpen: true };
    case "CLOSE":
      return { postId: null, isOpen: false };
    default:
      return state;
  }
}

export function PostModalContextProvider({ children }) {
  const [state, dispatch] = useReducer(postModalReducer, {
    postId: null,
    isOpen: false,
  });

  return (
    <PostModalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostModalContext.Provider>
  );
}

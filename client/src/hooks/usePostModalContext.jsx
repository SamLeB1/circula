import { useContext } from "react";
import { PostModalContext } from "../context/PostModalContext.jsx";

export default function usePostModalContext() {
  const context = useContext(PostModalContext);
  if (!context)
    throw Error(
      "usePostModalContext must be used inside a PostModalContextProvider."
    );
  return context;
}

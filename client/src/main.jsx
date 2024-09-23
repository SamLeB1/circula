import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { PostsContextProvider } from "./context/PostsContext.jsx";
import { PostModalContextProvider } from "./context/PostModalContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <PostModalContextProvider>
          <App />
        </PostModalContextProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);

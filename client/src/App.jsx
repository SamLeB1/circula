import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import useAuthContext from "./hooks/useAuthContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

export default function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

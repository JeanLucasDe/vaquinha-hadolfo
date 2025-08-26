import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Vaquinhas from "./pages/Vaquinhas";
import VaquinhaForm from "./pages/VaquinhaForm";
import Register from "./pages/Register";
import Vaquinha from "./pages/Vaquinha";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Carregando...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vaquinha/>} />
      </Routes>
    </BrowserRouter>
  );
}
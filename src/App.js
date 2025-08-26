import { HashRouter, Routes, Route } from "react-router-dom";
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
    <HashRouter>
      <Routes>
        <Route path="/" element={<Vaquinha/>} />
      </Routes>
    </HashRouter>
  );
}
// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/vaquinhas");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} />
        <button type="submit">Entrar</button>
        <p>
          Não tem conta? <a href="/register">Cadastre-se</a>
        </p>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>
    </div>
  );
}

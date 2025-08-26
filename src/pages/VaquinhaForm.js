// src/pages/VaquinhaForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";

export default function VaquinhaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [meta, setMeta] = useState("");
  const [chavePix, setChavePix] = useState("");

  useEffect(() => {
    if (id) {
      const fetchVaquinha = async () => {
        const docRef = doc(db, "vaquinhas", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitulo(data.titulo);
          setDescricao(data.descricao);
          setMeta(data.meta);
          setChavePix(data.chavePix);
        }
      };
      fetchVaquinha();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { titulo, descricao, meta: Number(meta), chavePix };
    if (id) {
      await updateDoc(doc(db, "vaquinhas", id), data);
    } else {
      await addDoc(collection(db, "vaquinhas"), data);
    }
    navigate("/vaquinhas");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{id ? "Editar Vaquinha" : "Nova Vaquinha"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input type="text" placeholder="Título" value={titulo} onChange={(e)=>setTitulo(e.target.value)} required />
        <textarea placeholder="Descrição" value={descricao} onChange={(e)=>setDescricao(e.target.value)} required />
        <input type="number" placeholder="Meta (R$)" value={meta} onChange={(e)=>setMeta(e.target.value)} required />
        <input type="text" placeholder="Chave Pix" value={chavePix} onChange={(e)=>setChavePix(e.target.value)} required />
        <button type="submit">{id ? "Salvar Alterações" : "Criar Vaquinha"}</button>
      </form>
    </div>
  );
}

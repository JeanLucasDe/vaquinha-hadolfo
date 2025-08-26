// src/pages/Vaquinhas.jsx
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Vaquinhas() {
  const [vaquinhas, setVaquinhas] = useState([]);
  const navigate = useNavigate();

  const fetchVaquinhas = async () => {
    const querySnapshot = await getDocs(collection(db, "vaquinhas"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setVaquinhas(data);
  };

  useEffect(() => {
    fetchVaquinhas();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "vaquinhas", id));
    fetchVaquinhas();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Minhas Vaquinhas</h1>
      <button onClick={()=>navigate("/vaquinhas/novo")}>Nova Vaquinha</button>
      <ul>
        {vaquinhas.map(v => (
          <li key={v.id} style={{ marginBottom: "10px" }}>
            <strong>{v.titulo}</strong> - {v.descricao} - Meta: R$ {v.meta} - Chave Pix: {v.chavePix}
            <button onClick={()=>navigate(`/vaquinhas/${v.id}`)}>Editar</button>
            <button onClick={()=>handleDelete(v.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

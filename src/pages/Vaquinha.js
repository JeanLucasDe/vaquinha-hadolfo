import PixQrCode from "../components/PixQrCode";
import styles from "./Vaquinha.module.css";
import PhotoPerfil from "../images/hadolfo.jpg"
import { useState } from "react";

export default function Vaquinha() {
  // Dados fictícios da vaquinha
  const meta = 3500; // meta em reais
  const arrecadado = 0; // total arrecadado
  const progresso = Math.min((arrecadado / meta) * 100, 100);
  const[nome, setNome] = useState("5")
  const [message, setMessage] = useState('')

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div>
            <div className={styles.cont_PIX}>
                <PixQrCode
                  chavePix="+5571983826917"
                  nomeRecebedor="Emily Luisa dos Santos Cerqueira"
                  cidade="SALVADOR"
                />
            </div>
            <p className={styles.text_bottom}>&copy; site criado por <a className={styles.link} href="https://www.instagram.com/jeanlsantoss/" target="_blank">Jean Lucas</a></p>
        </div>
      </div>
    </div>
  );
}

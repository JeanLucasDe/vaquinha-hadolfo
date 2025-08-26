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
            <p className={styles.create}>Criado em 26/08/2025</p>
            <h5 className={styles.sub_title}>Saúde</h5>
            <h1 className={styles.title}>Ajude Hadolfo</h1>
            <div className={styles.cont_photo}>
            </div>
            <p className={styles.description}>
              Me chamo Hadolfo e fui diagnosticado com Anemia Imunomediada, que é uma doença autoimune que causa a destruição prematura das hemácias pelo meu próprio sistema imune. Já fiz uma transfusão de sangue e minha mãe já comprou vários medicamentos. Tive uma hemorragia que me deixou muito fraco, estou tentando me manter estável com os remédios, sigo também com uma úlcera de córnea, estou sem enxergar e sentindo muita dor nos meus olhinhos. Esse dinheiro irá ajudar a comprar minhas vitaminas essenciais para aumentar minha imunidade, minha alimentação que precisa ser específica para me dar energia e refazer mais exames pra ver como meu organismo está reagindo ao tratamento. Cada doação será bem-vinda e você será muito abençoado(a) me ajudando a lutar para sobreviver e futuramente viver muito feliz como já estive um dia!
            </p>

            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${progresso}%` }}></div>
            </div>
            <p className={styles.progressText}>R$ {arrecadado} arrecadados de R$ {meta}</p>


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

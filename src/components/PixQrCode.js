import { useState, useEffect } from "react"; 
import { QRCodeCanvas } from "qrcode.react";
import styles from "./PixQrCode.module.css";

export default function PixQrCode() {
  const [valor, setValor] = useState("5");
  const [pixrecebedor, setPixRecebedor] = useState("");
  const [nomeRecebedor, setNomeRecebedor] = useState("");
  const [cidade, setCidade] = useState("");
  const [lembrar, setLembrar] = useState(false);

  // Carregar dados do localStorage quando a página iniciar
  useEffect(() => {
    const savedData = localStorage.getItem("pixData");
    if (savedData) {
      const { valor, pixrecebedor, nomeRecebedor, cidade } = JSON.parse(savedData);
      setValor(valor);
      setPixRecebedor(pixrecebedor);
      setNomeRecebedor(nomeRecebedor);
      setCidade(cidade);
      setLembrar(true);
    }
  }, []);

  // Salvar ou remover dados no localStorage
  useEffect(() => {
    if (lembrar) {
      localStorage.setItem("pixData", JSON.stringify({ valor, pixrecebedor, nomeRecebedor, cidade }));
    } else {
      localStorage.removeItem("pixData");
    }
  }, [lembrar, valor, pixrecebedor, nomeRecebedor, cidade]);

  // Função para limpar dados
  function limparDados() {
    localStorage.removeItem("pixData");
    setValor("5");
    setPixRecebedor("");
    setNomeRecebedor("");
    setCidade("");
    setLembrar(false);
  }

  function gerarPayload({ chavePix, nomeRecebedor, cidade, valor }) {
    const nome = nomeRecebedor.slice(0, 25);
    const cidadeTrunc = cidade.slice(0, 15);

    const gui = "0014BR.GOV.BCB.PIX";
    const chave = `01${chavePix.length.toString().padStart(2, "0")}${chavePix}`;
    const merchantAccount = `26${(gui.length + chave.length).toString().padStart(2, "0")}${gui}${chave}`;

    const mcc = "52040000";
    const currency = "5303986";

    const valorNum = Number(valor);
    const amount =
      valorNum > 0
        ? `54${valorNum.toFixed(2).length.toString().padStart(2, "0")}${valorNum.toFixed(2)}`
        : "";

    const country = "5802BR";
    const name = `59${nome.length.toString().padStart(2, "0")}${nome}`;
    const city = `60${cidadeTrunc.length.toString().padStart(2, "0")}${cidadeTrunc}`;

    const txidValue = "TX123";
    const txid = `62${(4 + txidValue.length).toString().padStart(2, "0")}050${txidValue.length}${txidValue}`;

    let payload = `000201${merchantAccount}${mcc}${currency}${amount}${country}${name}${city}${txid}6304`;

    const crc = crc16(payload).toUpperCase();
    return payload + crc;
  }

  function crc16(str) {
    let crc = 0xffff;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }
        crc &= 0xffff;
      }
    }
    return crc.toString(16).padStart(4, "0");
  }

  const payloadPix = gerarPayload({
    chavePix: pixrecebedor,
    nomeRecebedor: nomeRecebedor,
    cidade,
    valor: valor ? parseFloat(valor) : 0,
  });

  const [copiado, setCopiado] = useState(false);
  const copiar = () => {
    navigator.clipboard.writeText(payloadPix)
      .then(() => setCopiado(true))
      .catch(err => console.error("Erro ao copiar: ", err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Gerador de Qr code para Pix</h2>
        <div className={styles.line}/>
        <div className={styles.cont_form}>
          <p className={styles.label}>Nome:</p>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nomeRecebedor}
            onChange={(e) => setNomeRecebedor(e.target.value)}
            className={styles.input}
          />
          <p className={styles.label}>Cidade:</p>
          <input
            type="text"
            placeholder="Digite a cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className={styles.input}
          />
          <p className={styles.label}>Chave Pix:</p>
          <p className={styles.sub_label}>Se for celular use +55 antes do número</p>
          <input
            type="text"
            placeholder="Digite o pix"
            value={pixrecebedor}
            onChange={(e) => setPixRecebedor(e.target.value)}
            className={styles.input}
          />
          <label>
            <input
              type="checkbox"
              checked={lembrar}
              onChange={(e) => setLembrar(e.target.checked)}
              className={styles.checkbox}
            /> <strong>Lembrar-me</strong>
          </label>

          {lembrar && (
            <button onClick={limparDados} className={styles.clearBtn}>
              Limpar dados salvos
            </button>
          )}

          <p className={styles.label}>Valor:</p>
          <input
            type="number"
            placeholder="Digite o valor (R$)"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className={styles.input}
          />
        </div>
        {valor && nomeRecebedor && pixrecebedor && cidade && (
          <div>
            <QRCodeCanvas value={payloadPix} size={250} className={styles.qrcode} />
            <p className={styles.payload} onClick={copiar}>{payloadPix}</p>
            {copiado && <p>Código Copiado!</p>}
          </div>
        )}
      </div>
    </div>
  );
}

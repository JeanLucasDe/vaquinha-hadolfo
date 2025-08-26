import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import styles from "./PixQrCode.module.css";

export default function PixQrCode() {
  const [valor, setValor] = useState("5");

  function gerarPayload({ chavePix, nomeRecebedor, cidade, valor }) {
    // Trunca nome e cidade dentro dos limites do Pix
    const nome = nomeRecebedor.slice(0, 25);
    const cidadeTrunc = cidade.slice(0, 15);

    const gui = "0014BR.GOV.BCB.PIX";
    const chave = `01${chavePix.length
      .toString()
      .padStart(2, "0")}${chavePix}`;
    const merchantAccount = `26${(gui.length + chave.length)
      .toString()
      .padStart(2, "0")}${gui}${chave}`;

    const mcc = "52040000";
    const currency = "5303986";

    const valorNum = Number(valor);
    const amount =
      valorNum > 0
        ? `54${valorNum.toFixed(2).length
            .toString()
            .padStart(2, "0")}${valorNum.toFixed(2)}`
        : "";

    const country = "5802BR";
    const name = `59${nome.length.toString().padStart(2, "0")}${nome}`;
    const city = `60${cidadeTrunc.length
      .toString()
      .padStart(2, "0")}${cidadeTrunc}`;

    // TxID válido (exemplo simples)
    const txidValue = "TX123";
    const txid = `62${(4 + txidValue.length)
      .toString()
      .padStart(2, "0")}050${txidValue.length}${txidValue}`;

    let payload = `000201${merchantAccount}${mcc}${currency}${amount}${country}${name}${city}${txid}6304`;

    const crc = crc16(payload).toUpperCase();
    return payload + crc;
  }

  // CRC16 padrão Pix
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
    chavePix: "+5571983826917", // sua chave real
    nomeRecebedor: "Emily Luisa dos Santos Cerqueira",
    cidade: "SALVADOR",
    valor: valor ? parseFloat(valor) : 0,
  });

  const [copiado, setCopiado] = useState(false)
  const copiar = () => {
    navigator.clipboard.writeText(payloadPix)
      .then(() => {
        setCopiado(true)
      })
      .catch(err => {
        console.error("Erro ao copiar: ", err);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Doação via Pix</h2>
      <input
        type="number"
        placeholder="Digite o valor (R$)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className={styles.input}
      />
      {valor && (
        <QRCodeCanvas value={payloadPix} size={250} className={styles.qrcode} />
      )}
      <p className={styles.payload} onClick={copiar}>{payloadPix}</p>
      {copiado && <p>Código Copiado!</p>}
    </div>
  );
}

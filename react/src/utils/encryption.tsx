import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function encrypt(message: string, secretKey: string) {

  const iv = crypto.lib.WordArray.random(16);
  const key = crypto.enc.Base64.parse(secretKey!);

  const { ciphertext } = crypto.AES.encrypt(message, key, { iv });

  return crypto.enc.Base64.stringify(
    crypto.enc.Hex.parse(iv.toString() + ciphertext.toString())
  );
}

export function decrypt(ciphertext: string, secretKey: string) {
  const wordArray = crypto.enc.Base64.parse(ciphertext);
  const iv = crypto.enc.Hex.parse(wordArray.toString().substring(0, 32));
  const decoded = crypto.enc.Base64.stringify(
    crypto.enc.Hex.parse(wordArray.toString().substring(32))
  );
  const key = crypto.enc.Base64.parse(secretKey!);

  const decrypted = crypto.AES.decrypt(decoded, key, { iv });

  return decrypted.toString(crypto.enc.Utf8);
}

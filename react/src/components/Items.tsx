import useAuth from "../hooks/useAuth";
import { useItemsQuery } from "../types/graphql";
import { ItemCreate } from "./ItemCreate";
import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";

function encrypt(message: string, secretKey: string, iv: crypto.lib.WordArray) {
  // const iv = crypto.lib.WordArray.random(16);
  const encryptedKey = crypto.enc.Base64.parse(secretKey);

  const cipher = crypto.AES.encrypt(message, encryptedKey, {
    iv: iv,
  });

  return cipher.ciphertext.toString(crypto.enc.Base64);
}

function decrypt(
  ciphertext: string,
  secretKey: string,
  iv: crypto.lib.WordArray
) {
  // const iv = ciphertext.slice()
  const encryptedKey = crypto.enc.Base64.parse(secretKey);

  const decrypted = crypto.AES.decrypt(ciphertext, encryptedKey, {
    iv: iv,
  });

  return decrypted.toString(crypto.enc.Utf8);
}

export function Items() {
  const navigate = useNavigate();
  const { secretKey, logout } = useAuth();
  const { data, loading, error } = useItemsQuery();

  if (!secretKey) {
    logout();
    navigate("/");
    return;
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <h1>Items</h1>
      {data?.items.length === 0 ? (
        <div>No items</div>
      ) : (
        <ul>
          {data?.items.map((item) => {
            // TODO: append and slice iv from ciphertext
            const iv = crypto.lib.WordArray.random(16);
            const encrypted = encrypt(
              item?.password ?? "password",
              secretKey,
              iv
            );
            const decrypted = decrypt(encrypted, secretKey, iv);
            return (
              <li>
                <li>
                  <h4>{item.name}</h4>
                </li>
                <ul>
                  <li>
                    <b>Name: </b>
                    {item.name}
                  </li>
                  <li>
                    <b>Encrypted: </b>
                    {encrypted}
                  </li>
                  <li>
                    <b>Decrypted: </b>
                    {decrypted}
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      )}
      <ItemCreate />
    </main>
  );
}

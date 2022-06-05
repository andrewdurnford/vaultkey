import useAuth from "../hooks/useAuth";
import { useItemsQuery } from "../types/graphql";
import { ItemCreate } from "./ItemCreate";
import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";

function encrypt(message: string, secretKey: string) {
  const iv = crypto.lib.WordArray.random(16);
  const key = crypto.enc.Base64.parse(secretKey);

  const { ciphertext } = crypto.AES.encrypt(message, key, { iv });

  return crypto.enc.Base64.stringify(
    crypto.enc.Hex.parse(iv.toString() + ciphertext.toString())
  );
}

function decrypt(ciphertext: string, secretKey: string) {
  const wordArray = crypto.enc.Base64.parse(ciphertext);
  const iv = crypto.enc.Hex.parse(wordArray.toString().substring(0, 32));
  const decoded = crypto.enc.Base64.stringify(
    crypto.enc.Hex.parse(wordArray.toString().substring(32))
  );
  const key = crypto.enc.Base64.parse(secretKey);

  const decrypted = crypto.AES.decrypt(decoded, key, { iv });

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
            const encrypted = encrypt(item?.password ?? "password", secretKey);
            const decrypted = decrypt(encrypted, secretKey);
            return (
              <li key={item.id}>
                <h4>{item.name}</h4>
                <ul>
                  <li>
                    <b>Username: </b>
                    {item.username}
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

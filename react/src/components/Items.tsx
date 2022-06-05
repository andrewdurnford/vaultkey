import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useItemsQuery } from "../types/graphql";
import { decrypt } from "../utils/encryption";
import { ItemCreate } from "./ItemCreate";

export function Items() {
  const navigate = useNavigate();
  const { secretKey, logout } = useAuth();
  const { data, loading, error } = useItemsQuery();

  if (!secretKey) {
    logout();
    navigate("/");
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
            const decrypted = !!item.password
              ? decrypt(item.password, secretKey!)
              : null;
            return (
              <li key={item.id}>
                <h4>{item.name}</h4>
                <ul>
                  <li>
                    <b>Username: </b>
                    {item.username}
                  </li>
                  <li>
                    <b>Password: </b>
                    {item.password}
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

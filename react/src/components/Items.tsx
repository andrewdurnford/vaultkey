import { useItemsQuery } from "../types/graphql";
import { decrypt, encrypt } from "../utils/encryption";
import { ItemCreate } from "./ItemCreate";

export function Items() {
  const { data, loading, error } = useItemsQuery();
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
            const encrypted = !!item.password ? encrypt(item.password) : null;
            const decrypted = !!encrypted ? decrypt(encrypted) : null;
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

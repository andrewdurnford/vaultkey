import { useItemsQuery } from "../types/graphql";
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
          {data?.items.map((item) => (
            <li>{`{name: ${item.name}, password: ${item.password}}`}</li>
          ))}
        </ul>
      )}
      <ItemCreate />
    </main>
  );
}

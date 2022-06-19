import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { ItemCreate } from "../components/ItemCreate";
import { Main } from "../components/Main";
import { Stack } from "../components/Stack";
import { useItemsQuery } from "../types/graphql";
import { decrypt } from "../utils/encryption";

const Card = styled.div`
  list-style-type: none;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 6px;
`;

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
    <Main>
      <Stack gap="m">
        <h1>Items</h1>
        {data?.items.length === 0 ? (
          <div>No items</div>
        ) : (
          <Stack as="ul" gap="m">
            {data?.items.map((item) => {
              const decrypted = !!item.password
                ? decrypt(item.password, secretKey!)
                : null;
              return (
                <Card as="li" key={item.id}>
                  <Stack>
                    <h3>{item.name}</h3>
                    <span>{item.username}</span>
                    <span>{item.password}</span>
                    <span>{decrypted}</span>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        )}
        <ItemCreate />
      </Stack>
    </Main>
  );
}

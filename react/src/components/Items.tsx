import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { useItemsQuery } from "../types/graphql";
import { decrypt } from "../utils/encryption";
import { ItemCreate } from "./ItemCreate";
import { Main } from "./Main";

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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
      <Stack>
        <h1>Items</h1>
        {data?.items.length === 0 ? (
          <div>No items</div>
        ) : (
          <Stack as="ul">
            {data?.items.map((item) => {
              const decrypted = !!item.password
                ? decrypt(item.password, secretKey!)
                : null;
              return (
                <Card as="li" key={item.id}>
                  <Container>
                    <h3>{item.name}</h3>
                    <span>{item.username}</span>
                    <span>{item.password}</span>
                    <span>{decrypted}</span>
                  </Container>
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

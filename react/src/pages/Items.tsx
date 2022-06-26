import styled from "styled-components";
import { ItemCreate } from "../components/ItemCreate";
import { Container } from "../components/Container";
import { Stack } from "../components/Stack";
import { useItemsQuery } from "../types/graphql";
import { Link } from "react-router-dom";

const Card = styled.div`
  list-style-type: none;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 6px;
`;

export function Items() {
  const { data, loading, error } = useItemsQuery();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <Container as="main">
      <Stack gap="m">
        <h1>Items</h1>
        {data?.items.length === 0 ? (
          <div>No items</div>
        ) : (
          <Stack as="ul" gap="m">
            {data?.items.map((item) => {
              return (
                <Card as="li" key={item.id}>
                  <Stack>
                    <Link to={item.id}>{item.name}</Link>
                    <span>{item.username}</span>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        )}
        <ItemCreate />
      </Stack>
    </Container>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Container } from "../components/Container";
import { Notification } from "../components/Notification";
import { Stack } from "../components/Stack";
import { Link } from "react-router-dom";
import { useItemQuery } from "../types/graphql";
import { decrypt } from "../utils/encryption";

export function Item() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { secretKey, logout } = useAuth();
  const { data, loading, error } = useItemQuery({
    variables: { id: String(itemId) },
    skip: !itemId,
  });

  if (!secretKey) {
    logout();
    navigate("/");
  }

  if (loading) return <Container as="main">Loading...</Container>;

  if (error)
    return (
      <Container as="main">
        <Notification>{error.message}</Notification>
      </Container>
    );

  if (!data?.item || !itemId)
    return (
      <Container as="main">
        <Notification>Something went wrong</Notification>
      </Container>
    );

  const { item } = data;

  const decrypted = !!item.password
    ? decrypt(item.password, String(secretKey))
    : null;

  return (
    <Container as="main">
      <Stack key={item.id} gap="s">
        <Link to="/vault">Back</Link>
        <h1>{item?.name}</h1>
        <span>
          <strong>Username:</strong> {item?.username}
        </span>
        <span>
          <strong>Encrypted:</strong> {item?.password}
        </span>
        <span>
          <strong>Decrypted:</strong> {decrypted}
        </span>
      </Stack>
    </Container>
  );
}

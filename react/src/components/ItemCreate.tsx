import { gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { useItemCreateMutation } from "../types/graphql";
import { encrypt } from "../utils/encryption";

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid black;
  border-radius: 4px;
  background-color: #60a5fa;
  color: white;
`;

interface ItemCreateFormValues {
  name: string;
  username: string;
  password: string;
}

export function ItemCreate() {
  const navigate = useNavigate();
  const { secretKey, logout } = useAuth();

  if (!secretKey) {
    logout();
    navigate("/");
  }

  const [itemCreate, { error }] = useItemCreateMutation({
    onError: (err) => console.error(err),
    update(cache, { data }) {
      cache.modify({
        fields: {
          items(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.itemCreate,
              fragment: gql`
                fragment NewItem on Item {
                  id
                  name
                  password
                }
              `,
            });
            return [...existingItems, newItemRef];
          },
        },
      });
    },
  });

  const { register, handleSubmit, reset } = useForm<ItemCreateFormValues>();

  function onSubmit({ name, username, password }: ItemCreateFormValues) {
    itemCreate({
      variables: {
        input: { name, username, password: encrypt(password, secretKey!) },
      },
    });
    reset();
  }

  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Container>
            <label htmlFor="name">Name</label>
            <Input id="name" type="text" {...register("name")} />
          </Container>
          <Container>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" {...register("username")} />
          </Container>
          <Container>
            <label htmlFor="password">Password</label>
            <Input id="password" type="text" {...register("password")} />
          </Container>
          <div>
            <Button>Create</Button>
          </div>
        </Stack>
      </form>
    </Container>
  );
}

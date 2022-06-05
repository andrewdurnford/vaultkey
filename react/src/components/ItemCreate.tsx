import { gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useItemCreateMutation } from "../types/graphql";
import { encrypt } from "../utils/encryption";

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
    <>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register("name")} />
        <label htmlFor="username">Username</label>
        <input id="username" type="text" {...register("username")} />
        <label htmlFor="password">Password</label>
        <input id="password" type="text" {...register("password")} />
        <button>Create</button>
      </form>
    </>
  );
}

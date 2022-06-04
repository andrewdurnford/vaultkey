import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useLoginMutation } from "../types/graphql";

interface LoginFormValues {
  email: string;
  password: string;
}

export function Login() {
  const { login: loginCallback } = useAuth();

  const [login, { error }] = useLoginMutation({
    onError: (err) => console.error(err),
    onCompleted: ({ login: data }) => {
      if (data?.user && data?.token) {
        loginCallback(data);
      }
    },
  });

  function onSubmit({ email, password }: LoginFormValues) {
    login({ variables: { input: { email, password } } });
  }

  const { register, handleSubmit } = useForm<LoginFormValues>();

  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
        <button>Login</button>
      </form>
    </main>
  );
}

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLoginMutation } from "../types/graphql";

interface LoginFormValues {
  email: string;
  password: string;
}

export function Login() {
  const { login: loginCallback } = useAuth();
  const navigate = useNavigate();

  const [login, { error }] = useLoginMutation();

  function onSubmit({ email, password }: LoginFormValues) {
    login({ variables: { input: { email, password } } })
      .then(({ data }) => {
        if (!!data) {
          loginCallback({
            token: data?.login?.token ?? "",
            email,
            password,
          });
          navigate("/");
        }
      })
      .catch((e) => console.error(e));
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

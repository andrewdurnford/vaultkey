import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSignupMutation } from "../types/graphql";

interface SignupFormValues {
  email: string;
  password: string;
}

export function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [signup, { error }] = useSignupMutation();

  function onSubmit({ email, password }: SignupFormValues) {
    signup({ variables: { input: { email, password } } })
      .then(({ data }) => {
        login({
          token: data?.signup?.token ?? "",
          email,
          password,
        });
        navigate("/");
      })
      .catch((e) => console.error(e));
  }

  const { register, handleSubmit } = useForm<SignupFormValues>();

  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
        <button>Signup</button>
      </form>
    </main>
  );
}

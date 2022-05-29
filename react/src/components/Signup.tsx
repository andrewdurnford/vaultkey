import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useSignupMutation } from "../types/graphql";

interface SignupFormValues {
  email: string;
  password: string;
}

export function Signup() {
  const { login } = useAuth();

  const [signup, { error }] = useSignupMutation({
    onError: (err) => console.error(err),
    onCompleted: ({ signup: data }) => {
      if (data?.user && data?.token) {
        login(data);
      }
    },
  });

  function onSubmit({ email, password }: SignupFormValues) {
    signup({ variables: { input: { email, password } } });
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

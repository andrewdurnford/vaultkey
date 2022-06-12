import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSignupMutation } from "../types/graphql";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { Input } from "./Input";
import { Main } from "./Main";
import { Stack } from "./Stack";

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

  return (
    <Main>
      <Stack gap="s">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="m">
            {error && <Alert>{error.message}</Alert>}
            <Stack>
              <label htmlFor="email">Email</label>
              <Input id="email" type="text" {...register("email")} />
            </Stack>
            <Stack>
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" {...register("password")} />
            </Stack>
            <div>
              <Button>Sign up</Button>
            </div>
          </Stack>
        </form>
      </Stack>
    </Main>
  );
}

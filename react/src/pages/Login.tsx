import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLoginMutation } from "../types/graphql";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Main } from "../components/Main";
import { Stack } from "../components/Stack";

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

  return (
    <Main>
      <Stack gap="s">
        <h1>Login</h1>
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
              <Button>Log in</Button>
            </div>
          </Stack>
        </form>
      </Stack>
    </Main>
  )
}

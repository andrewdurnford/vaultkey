import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLoginMutation } from "../types/graphql";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { Notification } from "../components/Notification";
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
    <Container as="main">
      <Stack gap="s">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="m">
            {error && <Notification>{error.message}</Notification>}
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
    </Container>
  );
}

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSignupMutation } from "../types/graphql";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { Notification } from "../components/Notification";
import { Stack } from "../components/Stack";

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
    <Container as="main">
      <Stack gap="s">
        <h1>Signup</h1>
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
              <Button>Sign up</Button>
            </div>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}

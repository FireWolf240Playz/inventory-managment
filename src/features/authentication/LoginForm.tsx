import { useState, FormEvent, ChangeEvent } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isLoading = false; // Temporarily placed - will remove it as soon as the login feature is implemented with backend

  // Handle form submission
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    // Handle login logic here
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large">{!isLoading ? "Log in" : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

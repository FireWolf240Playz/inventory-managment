import React, { useState, ChangeEvent } from "react";
import Button from "../../ui/Button.tsx";
import Form from "../../ui/Form.tsx";
import Input from "../../ui/Input.tsx";
import FormRowVertical from "../../ui/FormRowVertical.tsx";
import SpinnerMini from "../../ui/SpinnerMini.tsx";
import { useDispatch } from "react-redux";

import { login } from "../../store/thunks/authThunks.ts";
import { AppDispatch } from "../../store/store.ts";
import { useNavigate } from "react-router";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(login({ email, password }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form type="regular" onSubmit={handleSubmit}>
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
        <Button size="large" type="submit">
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

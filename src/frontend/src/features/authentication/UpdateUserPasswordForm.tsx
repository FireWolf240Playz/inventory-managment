import { useForm, SubmitHandler } from "react-hook-form";
import FormRow from "../../ui/FormRow.tsx";
import Button from "../../ui/Button.tsx";
import Form from "../../ui/Form.tsx";
import Input from "../../ui/Input.tsx";

interface UpdatePasswordFormValues {
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<UpdatePasswordFormValues>();

  const onSubmit: SubmitHandler<UpdatePasswordFormValues> = () => {
    // updateUser({ password }, { onSuccess: reset });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues("password") === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={() => reset()} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;

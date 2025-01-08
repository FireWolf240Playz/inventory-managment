import { useState, FormEvent, ChangeEvent } from "react";

import Button from "../../ui/Button.tsx";
import FileInput from "../../ui/FileInput.tsx";
import Form from "../../ui/Form.tsx";
import FormRow from "../../ui/FormRow.tsx";
import Input from "../../ui/Input.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

function UpdateUserDataForm() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { email, name } = user;

  const [fullName, setFullName] = useState<string>(name);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleCancel() {
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input disabled defaultValue={email} />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFullName(e.target.value)
          }
          id="fullName"
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) setAvatar(e.target.files[0]);
          }}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

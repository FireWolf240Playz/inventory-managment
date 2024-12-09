import { useState, FormEvent, ChangeEvent } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateUserDataForm() {
  // Assume useUser provides a user with the correct structure

  const [fullName, setFullName] = useState<string>("");
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
        <Input />
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

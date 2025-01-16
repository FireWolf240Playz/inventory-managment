import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateUser } from "../../store/thunks/authThunks";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { toast } from "react-hot-toast";

interface UpdateUserDataFormInputs {
  fullName: string;
  avatar: FileList | null;
}

function UpdateUserDataForm() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const { name, email } = user!;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateUserDataFormInputs>({
    defaultValues: { fullName: name, avatar: null },
  });

  const avatar = watch("avatar");

  const onSubmit = async (data: UpdateUserDataFormInputs) => {
    try {
      const avatarFile = data.avatar ? data.avatar[0] : null;

      await dispatch(
        updateUser({ fullName: data.fullName, avatar: avatarFile }),
      ).unwrap();
      toast.success("User updated successfully!");

      reset({ fullName: data.fullName, avatar: null });
    } catch {
      toast.error("Failed to update user. Please try again.");
    }
  };

  const handleCancel = () => {
    reset({ fullName: name, avatar: null });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input disabled defaultValue={email} />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "Full name is required" })}
        />
        {errors.fullName && <p className="error">{errors.fullName.message}</p>}
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" {...register("avatar")} />
        {avatar && avatar[0] && <p>Selected file: {avatar[0].name}</p>}
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

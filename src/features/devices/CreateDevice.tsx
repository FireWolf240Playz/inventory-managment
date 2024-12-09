import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

interface DeviceData {
  model: string;
  assignedTo: string;
  deviceId: string;
  deviceFactorySerialNumber: number;
  description: string;
}

interface DeviceToEdit {
  deviceId?: string;
  model?: string;
  assignedTo?: string | null;
  deviceFactorySerialNumber?: number;
  description?: string;
}

interface CreateDeviceProps {
  deviceToEdit?: DeviceToEdit;
  onCloseModal?: () => void;
}

function CreateDeviceForm({
  deviceToEdit = {},
  onCloseModal,
}: CreateDeviceProps) {
  const { deviceId, ...editValues } = deviceToEdit;
  const isEditSession = Boolean(deviceId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<DeviceData>({
      defaultValues: {
        model: editValues.model || "",
        assignedTo: editValues.assignedTo || "",
        deviceFactorySerialNumber: editValues.deviceFactorySerialNumber || 0,
        description: editValues.description || "",
      },
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<DeviceData> = (data) => {
    console.log("Form submitted:", data);
    if (onCloseModal) onCloseModal();
  };

  const onError: SubmitErrorHandler<DeviceData> = (errors) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Device model" error={errors?.model?.message}>
        <Input
          type="text"
          id="deviceModel"
          {...register("model", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Assigned to" error={errors?.assignedTo?.message}>
        <Input
          type="text"
          id="assignedTo"
          {...register("assignedTo", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Device ID" error={errors?.deviceId?.message}>
        <Input
          type="text"
          id="deviceId"
          {...register("deviceId", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Device factory serial number"
        error={errors?.deviceFactorySerialNumber?.message}
      >
        <Input
          type="number"
          id="deviceFactorySerialNumber"
          {...register("deviceFactorySerialNumber", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow
        label="Description of device"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            reset();
            onCloseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isEditSession ? "Edit device" : "Create new device"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateDeviceForm;

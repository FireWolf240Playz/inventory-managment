import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "../../store/slices/entityUtils.ts";
import { addDevice } from "../../store/slices/devices/deviceSlice";
import {
  findEmployeeById,
  selectAllEmployees,
} from "../../store/slices/employees/selectors.ts";
import Select from "react-select";
import store from "../../store/store.ts";

interface DeviceData {
  model: string;
  assignedTo: string;
  deviceId: string;
  deviceFactorySerialNumber: string;
  description: string;
}

interface DeviceToEdit {
  deviceId?: string;
  model?: string;
  assignedTo?: string | null;
  deviceFactorySerialNumber?: string;
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
  const {
    deviceId,
    model,
    assignedTo,
    deviceFactorySerialNumber,
    description,
  } = deviceToEdit;
  const isEditSession = Boolean(deviceId);

  const dispatch = useDispatch();
  const allEmployees = useSelector(selectAllEmployees);

  const { register, handleSubmit, reset, formState, control } =
    useForm<DeviceData>({
      defaultValues: {
        model: model || "",
        deviceId: deviceId || "",
        assignedTo: assignedTo || "",
        deviceFactorySerialNumber: deviceFactorySerialNumber || "0",
        description: description || "",
      },
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<DeviceData> = (data) => {
    const state = store.getState();
    const foundEmployee = findEmployeeById(data.assignedTo)(state);

    if (!foundEmployee) return;

    const transformedData = {
      ...data,
      status: 1 as const,
      assignedTo: foundEmployee.employeeName,
      department: foundEmployee.department,
      deviceId: generateUniqueId(),
    };

    dispatch(addDevice(transformedData));
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
        <Controller
          name="assignedTo"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <Select
              options={allEmployees}
              value={allEmployees.filter((opt) => value === opt.value)}
              onChange={(selectedOption) =>
                onChange(selectedOption ? selectedOption.value : null)
              }
              isClearable
              maxMenuHeight={200}
              placeholder="Select employee"
            />
          )}
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

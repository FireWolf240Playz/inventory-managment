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
import { useSelector } from "react-redux";
import { generateUniqueId } from "../../store/slices/entityUtils";

import {
  findEmployeeById,
  selectAllEmployees,
} from "../../store/slices/employees/selectors";
import { Employee } from "../../store/slices/employees/employeeSlice";
import Select from "react-select";
import store from "../../store/store";
import { createDevice, editDevice } from "../../services/apiDevices";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Device } from "../../store/slices/devices/deviceSlice.ts";
import { editEmployee } from "../../services/apiEmployees.ts";

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

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, Device>({
    mutationFn: createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      toast.success("Successfully created new device");
    },
    onError: () => {
      toast.error("Something went wrong while creating device");
    },
  });

  const { mutate } = useMutation<void, Error, Device>({
    mutationFn: editDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      toast.success("Successfully updated device");
    },
    onError: () => {
      toast.error("Something went wrong while updating device");
    },
  });

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

  const onSubmit: SubmitHandler<DeviceData> = async (data) => {
    try {
      const state = store.getState();
      const foundEmployee = findEmployeeById(data.assignedTo)(state);

      if (!foundEmployee) {
        console.error("No employee found for the provided ID.");
        return;
      }

      const deviceId = isEditSession ? data.deviceId : generateUniqueId();

      const transformedData: Device = {
        ...data,
        deviceId,
        status: 1,
        assignedTo: foundEmployee.employeeId,
        department: foundEmployee.department,
      };

      if (isEditSession) {
        mutate(transformedData);
      } else {
        mutation.mutate(transformedData);
      }

      const updatedEmployee: Employee = {
        ...foundEmployee,
        assignedDevices: [...(foundEmployee.assignedDevices || []), deviceId],
      };

      // Update the employee in the backend
      await editEmployee(updatedEmployee);

      onCloseModal?.();
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
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
            required: isEditSession ? "This field is required" : false,
          })}
        />
      </FormRow>

      <FormRow label="Assigned to" error={errors?.assignedTo?.message}>
        <Controller
          name="assignedTo"
          control={control}
          rules={
            isEditSession
              ? { required: false }
              : { required: "This field is required" }
          }
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
            required: isEditSession ? "This field is required" : false,
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
            required: isEditSession ? "This field is required" : false,
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

import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import { useSelector } from "react-redux";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import ThemedForm from "../../ui/ThemedForm.tsx";
import { ThemedSelect } from "../../ui/ThemedSelect";

import { generateUniqueId } from "../../store/slices/entityUtils";
import {
  findEmployeeById,
  selectAllEmployees,
} from "../../store/slices/employees/selectors";
import store from "../../store/store";
import { createDevice, editDevice } from "../../services/apiDevices";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEmployee } from "../../services/apiEmployees";

import { Device } from "../../store/slices/devices/deviceSlice";
import { Employee } from "../../store/slices/employees/employeeSlice";

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

  const isDarkMode = document.documentElement.classList.contains("dark-mode");

  const queryClient = useQueryClient();
  const createMutation = useMutation<void, Error, Device>({
    mutationFn: createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      toast.success("Successfully created new device");
    },
    onError: () => {
      toast.error("Something went wrong while creating device");
    },
  });
  const editMutation = useMutation<void, Error, Device>({
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<DeviceData>({
    defaultValues: {
      model: model || "",
      deviceId: deviceId || "",
      assignedTo: assignedTo || "",
      deviceFactorySerialNumber: deviceFactorySerialNumber || "0",
      description: description || "",
    },
  });

  const onSubmit: SubmitHandler<DeviceData> = async (data) => {
    try {
      const state = store.getState();
      const foundEmployee = findEmployeeById(data.assignedTo)(state);

      if (!foundEmployee) {
        console.error("No employee found for that ID");
        return;
      }

      const newDeviceId = isEditSession ? data.deviceId : generateUniqueId();

      const transformedData: Device = {
        ...data,
        deviceId: newDeviceId,
        status: 1,
        assignedTo: foundEmployee.employeeId,
        department: foundEmployee.department,
      };

      if (isEditSession) {
        editMutation.mutate(transformedData);
      } else {
        createMutation.mutate(transformedData);
      }

      const updatedEmployee: Employee = {
        ...foundEmployee,
        assignedDevices: [
          ...(foundEmployee.assignedDevices || []),
          newDeviceId,
        ],
      };
      await editEmployee(updatedEmployee);

      onCloseModal?.();
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  const onError: SubmitErrorHandler<DeviceData> = (errors) => {
    console.error("Validation errors:", errors);
  };

  return (
    <ThemedForm
      data-theme={isDarkMode ? "dark-mode" : "light-mode"}
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
            <ThemedSelect
              options={allEmployees}
              value={allEmployees.filter((opt) => opt.value === value)}
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
    </ThemedForm>
  );
}

export default CreateDeviceForm;

import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ThemedForm from "../../ui/ThemedForm.tsx";
import { ThemedSelect } from "../../ui/ThemedSelect";

import { generateUniqueId } from "../../store/slices/entityUtils";
import store from "../../store/store";
import {
  findDeviceById,
  selectAvailableDevices,
} from "../../store/slices/devices/selectors";
import { selectAvailableLicenses } from "../../store/slices/licenses/selectors";
import {
  LOCATION_OPTIONS_OFFICE_AND_REMOTE,
  ROLE_OPTIONS,
  DEPARTMENT_OPTIONS,
} from "../../utils/constants";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee, editEmployee } from "../../services/apiEmployees";
import { Employee } from "../../store/slices/employees/employeeSlice";
import {
  updateDeviceStatus,
  reassignDevicesToEmployee,
} from "../../store/slices/devices/deviceSlice";
import { toast } from "react-hot-toast";

interface EmployeeData {
  employeeId: string;
  employeeName: string;
  assignedDevices: string[] | null;
  assignedLicenses: string[] | null;
  department: string;
  location: string;
  role: string[];
}

interface EmployeeToEdit {
  employeeId?: string;
  employeeName?: string;
  assignedDevices?: string[] | null;
  assignedLicenses?: string[] | null;
  department?: string;
  location?: string;
  role?: string[];
}

interface CreateEmployeeProps {
  employeeToEdit?: EmployeeToEdit;
  onCloseModal?: () => void;
}

function CreateEmployeeForm({
  employeeToEdit = {},
  onCloseModal,
}: CreateEmployeeProps) {
  const {
    employeeId,
    employeeName,
    location,
    role,
    department,
    assignedDevices,
    assignedLicenses,
  } = employeeToEdit;

  const isEditSession = Boolean(employeeId);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const isDarkMode = document.documentElement.classList.contains("dark-mode");

  const createMutation = useMutation<void, Error, Employee>({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Successfully created new employee");
    },
    onError: () => {
      toast.error("Something went wrong while creating employee");
    },
  });
  const editMutation = useMutation<void, Error, Employee>({
    mutationFn: editEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Successfully updated employee");
    },
    onError: () => {
      toast.error("Something went wrong while updating employee");
    },
  });

  const availableDevices = useSelector(selectAvailableDevices);
  const availableLicenses = useSelector(selectAvailableLicenses);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeData>({
    defaultValues: {
      employeeId: employeeId || "",
      employeeName: employeeName || "",
      assignedDevices: assignedDevices || [],
      assignedLicenses: assignedLicenses || [],
      department: department || "",
      location: location || "",
      role: role || [],
    },
  });

  const onSubmit: SubmitHandler<EmployeeData> = (data) => {
    const state = store.getState();
    const isEdit = Boolean(data.employeeId);

    if (data.assignedDevices) {
      const foundDevices = data.assignedDevices
        .map((deviceId) => findDeviceById(deviceId)(state))
        .filter(Boolean);

      const transformedData = {
        ...data,
        assignedDevices: foundDevices?.map((device) => device!.deviceId) || [],
      };

      if (isEdit) {
        const oldDeviceIds = employeeToEdit.assignedDevices || [];
        const newDeviceIds = data.assignedDevices || [];

        editMutation.mutate(transformedData);

        dispatch(
          reassignDevicesToEmployee({
            employeeName: data.employeeName,
            oldDeviceIds,
            newDeviceIds,
          }),
        );
        dispatch(
          updateDeviceStatus({
            deviceIds: newDeviceIds,
            status: 1,
          }),
        );
      } else {
        transformedData.employeeId = generateUniqueId();
        createMutation.mutate(transformedData);
      }

      dispatch(
        updateDeviceStatus({
          deviceIds: data.assignedDevices,
          status: 1 as const,
        }),
      );

      onCloseModal?.();
    }
  };

  const onError: SubmitErrorHandler<EmployeeData> = (formErrors) => {
    console.error("Form validation errors:", formErrors);
  };

  return (
    <ThemedForm
      data-theme={isDarkMode ? "dark-mode" : "light-mode"}
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Employee Name" error={errors?.employeeName?.message}>
        <Input
          type="text"
          id="employeeName"
          {...register("employeeName", {
            required: isEditSession ? "This field is required" : false,
          })}
        />
      </FormRow>

      <FormRow
        label="Assigned Devices"
        error={errors?.assignedDevices?.message}
      >
        <Controller
          name="assignedDevices"
          control={control}
          rules={
            isEditSession
              ? { required: false }
              : { required: "This field is required" }
          }
          render={({ field: { onChange, value } }) => (
            <ThemedSelect
              isMulti
              options={availableDevices}
              value={availableDevices.filter((opt) =>
                value?.includes(opt.value),
              )}
              onChange={(selectedOptions) =>
                onChange(
                  Array.isArray(selectedOptions)
                    ? selectedOptions.map((opt) => opt.value)
                    : [],
                )
              }
              isClearable
              maxMenuHeight={200}
              placeholder="Select devices"
            />
          )}
        />
      </FormRow>

      <FormRow
        label="Assigned Licenses"
        error={errors?.assignedDevices?.message}
      >
        <Controller
          name="assignedLicenses"
          control={control}
          rules={
            isEditSession
              ? { required: false }
              : { required: "This field is required" }
          }
          render={({ field: { onChange, value } }) => (
            <ThemedSelect
              isMulti
              options={availableLicenses}
              value={availableLicenses.filter((opt) =>
                value?.includes(opt.value),
              )}
              onChange={(selectedOptions) =>
                onChange(
                  Array.isArray(selectedOptions)
                    ? selectedOptions.map((opt) => opt.value)
                    : [],
                )
              }
              isClearable
              maxMenuHeight={200}
              placeholder="Select licenses"
            />
          )}
        />
      </FormRow>

      <FormRow label="Department" error={errors?.department?.message}>
        <Controller
          name="department"
          control={control}
          rules={
            isEditSession
              ? { required: false }
              : { required: "This field is required" }
          }
          render={({ field: { onChange, value } }) => (
            <ThemedSelect
              options={DEPARTMENT_OPTIONS}
              value={DEPARTMENT_OPTIONS.find((opt) => opt.value === value)}
              onChange={(selectedOption) => onChange(selectedOption?.label)}
              isClearable
              maxMenuHeight={200}
              placeholder="Select department"
            />
          )}
        />
      </FormRow>

      <FormRow label="Location" error={errors?.location?.message}>
        <Controller
          name="location"
          control={control}
          rules={
            isEditSession
              ? { required: false }
              : { required: "This field is required" }
          }
          render={({ field: { onChange, value } }) => (
            <ThemedSelect
              options={LOCATION_OPTIONS_OFFICE_AND_REMOTE}
              value={LOCATION_OPTIONS_OFFICE_AND_REMOTE.find(
                (opt) => opt.value === value,
              )}
              onChange={(selectedOption) => onChange(selectedOption?.label)}
              isClearable
              maxMenuHeight={200}
              placeholder="Select location"
            />
          )}
        />
      </FormRow>

      <FormRow label="Role" error={errors?.role?.message}>
        <Controller
          name="role"
          control={control}
          rules={
            isEditSession
              ? { required: false }
              : { required: "This field is required" }
          }
          render={({ field: { onChange, value } }) => (
            <ThemedSelect
              isMulti
              options={ROLE_OPTIONS}
              value={ROLE_OPTIONS.filter((opt) => value.includes(opt.label))}
              onChange={(selectedOption) => onChange(selectedOption?.label)}
              isClearable
              maxMenuHeight={200}
              placeholder="Select role"
            />
          )}
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
          {isEditSession ? "Edit Employee" : "Create Employee"}
        </Button>
      </FormRow>
    </ThemedForm>
  );
}

export default CreateEmployeeForm;

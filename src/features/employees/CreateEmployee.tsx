import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

import {
  addEmployee,
  editEmployee,
} from "../../store/slices/employees/employeeSlice.ts";
import {
  LOCATION_OPTIONS_OFFICE_AND_REMOTE,
  ROLE_OPTIONS,
  DEPARTMENT_OPTIONS,
} from "../../utils/constants.ts";
import Select from "react-select";

import {
  findDeviceById,
  selectAvailableDevices,
} from "../../store/slices/devices/selectors.ts";
import { generateUniqueId } from "../../store/slices/entityUtils.ts";
import {
  updateDeviceStatus,
  reassignDevicesToEmployee,
} from "../../store/slices/devices/deviceSlice.ts";
import store from "../../store/store.ts";

interface EmployeeData {
  employeeId: string;
  employeeName: string;
  assignedDevices: string[] | null;
  department: string;
  location: string;
  role: string[];
}

interface EmployeeToEdit {
  employeeId?: string;
  employeeName?: string;
  assignedDevices?: string[] | null;
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
    employeeId = "",
    employeeName,
    location,
    role,
    department,
    assignedDevices,
  } = employeeToEdit;
  const isEditSession = Boolean(employeeId);
  const dispatch = useDispatch();

  const availableDevices = useSelector(selectAvailableDevices);

  const { control, register, handleSubmit, reset, formState } =
    useForm<EmployeeData>({
      defaultValues: {
        employeeId: employeeId || "",
        employeeName: employeeName || "",
        assignedDevices: assignedDevices || [],
        department: department || "",
        location: location || "",
        role: role || [],
      },
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<EmployeeData> = (data) => {
    const state = store.getState();
    const isEditSession = Boolean(data.employeeId);

    if (data.assignedDevices) {
      const foundDevices = data.assignedDevices
        .map((deviceId) => findDeviceById(deviceId)(state))
        .filter(Boolean);

      const transformedData = {
        ...data,
        assignedDevices: foundDevices?.map((device) => device!.deviceId) || [],
      };
      if (isEditSession) {
        const oldDeviceIds = employeeToEdit.assignedDevices || [];
        const newDeviceIds = data.assignedDevices || [];

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

        dispatch(editEmployee(transformedData));
      } else {
        transformedData.employeeId = generateUniqueId();

        dispatch(addEmployee(transformedData));
      }

      dispatch(
        updateDeviceStatus({
          deviceIds: data.assignedDevices,
          status: 1 as const,
        }),
      );
      if (onCloseModal) onCloseModal();
    }
  };

  const onError: SubmitErrorHandler<EmployeeData> = (errors) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Employee Name" error={errors?.employeeName?.message}>
        <Input
          type="text"
          id="employeeName"
          {...register("employeeName", {
            required: "This field is required",
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
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <Select
              options={availableDevices} // array of { value: deviceId, label: displayString }
              isMulti
              // Now we compare each option's .value (the deviceId) to the array in `value`
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

      <FormRow label="Department" error={errors?.department?.message}>
        <Controller
          name="department"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <Select
              options={[...DEPARTMENT_OPTIONS]}
              value={[...DEPARTMENT_OPTIONS].find((opt) => opt.value === value)}
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
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <Select
              // The array of location options, including remote
              options={[...LOCATION_OPTIONS_OFFICE_AND_REMOTE]}
              // Convert the string from the form state back into a proper { value, label } object
              value={[...LOCATION_OPTIONS_OFFICE_AND_REMOTE].find(
                (opt) => opt.value === value,
              )}
              // Only store .label (a string) in the form
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
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <Select
              options={[...ROLE_OPTIONS]}
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
    </Form>
  );
}

export default CreateEmployeeForm;

import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

import { generateUniqueId } from "../../store/slices/entityUtils.ts";
import {
  addLicense,
  editLicense,
} from "../../store/slices/licenses/licensesSlice.ts";
import {
  selectAllEmployees,
  findEmployeeById,
} from "../../store/slices/employees/selectors.ts";
import store from "../../store/store.ts";

interface LicenseData {
  licenseId: string;
  licenseName: string;
  type: string;
  assignedTo: string; // or employee ID
  department: string;
  status: number; // 0 | 1 | 2, or store as string
  description: string;
}

/** Fields needed for editing an existing License */
interface LicenseToEdit {
  licenseId?: string;
  licenseName?: string;
  type?: string;
  assignedTo?: string | null;
  department?: string;
  status?: number;
  description?: string;
}

interface CreateLicenseProps {
  licenseToEdit?: LicenseToEdit;
  onCloseModal?: () => void;
}

function CreateLicenseForm({
  licenseToEdit = {},
  onCloseModal,
}: CreateLicenseProps) {
  const {
    licenseId,
    licenseName,
    type,
    assignedTo,
    department,
    status,
    description,
  } = licenseToEdit;
  const isEditSession = Boolean(licenseId);

  const dispatch = useDispatch();

  const allEmployees = useSelector(selectAllEmployees);

  const { register, handleSubmit, control, reset, formState } =
    useForm<LicenseData>({
      defaultValues: {
        licenseId: licenseId || "",
        licenseName: licenseName || "",
        type: type || "",
        assignedTo: assignedTo || "",
        department: department || "",
        status: status || 0,
        description: description || "",
      },
    });
  const { errors } = formState;

  // 1) Submitting the form
  const onSubmit: SubmitHandler<LicenseData> = (data) => {
    const state = store.getState();
    const foundEmployee = findEmployeeById(data.assignedTo)(state);

    const transformedData = {
      ...data,
      status: 1 as const,
      assignedTo: foundEmployee?.employeeId || null,
    };

    if (isEditSession) {
      // 2A) Editing an existing license
      dispatch(editLicense(transformedData));
    } else {
      // 2B) Creating a new license
      transformedData.licenseId = generateUniqueId();
      dispatch(addLicense(transformedData));
    }

    if (onCloseModal) onCloseModal();
  };

  const onError: SubmitErrorHandler<LicenseData> = (errors) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="License Name" error={errors?.licenseName?.message}>
        <Input
          type="text"
          id="licenseName"
          {...register("licenseName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Type" error={errors?.type?.message}>
        <Input
          type="text"
          id="licenseType"
          {...register("type", {
            required:
              "Please enter a license type (Subscription, Perpetual, etc.)",
          })}
        />
      </FormRow>

      <FormRow label="Assigned To" error={errors?.assignedTo?.message}>
        <Controller
          name="assignedTo"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <Select
              options={allEmployees}
              value={allEmployees.filter((opt) => value === opt.value)}
              onChange={(selectedOption) =>
                onChange(selectedOption ? selectedOption.value : "")
              }
              isClearable
              maxMenuHeight={200}
              placeholder="Select employee"
            />
          )}
        />
      </FormRow>

      <FormRow label="Department" error={errors?.department?.message}>
        <Input
          type="text"
          id="licenseDepartment"
          {...register("department", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <Input
          type="number"
          id="licenseStatus"
          {...register("status", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea id="description" {...register("description")} />
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
          {isEditSession ? "Edit License" : "Create License"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateLicenseForm;

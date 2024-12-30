import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import Form from "../../ui/Form.tsx";
import FormRow from "../../ui/FormRow.tsx";
import Input from "../../ui/Input.tsx";

import Button from "../../ui/Button.tsx";

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
import { selectLicenseTypeOptions } from "../../store/slices/licenses/selectors.ts";

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
  const typeLicenseOptions = useSelector(selectLicenseTypeOptions);

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

    if (!foundEmployee) return;
    const transformedData = {
      ...data,
      status: 1 as const,
      assignedTo: foundEmployee.employeeName,
      department: foundEmployee.department,
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
        <Controller
          name="type"
          rules={{ required: "This field is required" }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              options={typeLicenseOptions}
              value={typeLicenseOptions.filter((opt) => value === opt.value)}
              onChange={(selectedOption) =>
                onChange(selectedOption ? selectedOption.value : null)
              }
              isClearable
              maxMenuHeight={200}
              placeholder="Select type"
            />
          )}
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

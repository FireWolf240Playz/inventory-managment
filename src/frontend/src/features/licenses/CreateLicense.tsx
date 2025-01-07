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
import { License } from "../../store/slices/licenses/licensesSlice.ts";
import {
  selectAllEmployees,
  findEmployeeById,
} from "../../store/slices/employees/selectors.ts";
import store from "../../store/store.ts";
import { selectLicenseTypeOptions } from "../../store/slices/licenses/selectors.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLicense, editLicense } from "../../services/apiLicenses.ts";
import { toast } from "react-hot-toast";
import {
  addLicenseToEmployee,
  Employee,
} from "../../store/slices/employees/employeeSlice.ts";
import { updateEmployee } from "../../../../backend/src/controllers/employeeController.ts";
import { editEmployee } from "../../services/apiEmployees.ts";

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

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, License>({
    mutationFn: createLicense,
    onSuccess: () => {
      queryClient.invalidateQueries(["licenses"]);
      toast.success("Successfully created new license");
    },
  });

  const { mutate } = useMutation<void, Error, License>({
    mutationFn: editLicense,
    onSuccess: () => {
      queryClient.invalidateQueries(["licenses"]);
      toast.success("Successfully updated new license");
    },

    onError: () => {
      toast.error("Something went wrong while updating license");
    },
  });

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

  const onSubmit: SubmitHandler<LicenseData> = async (data) => {
    try {
      const state = store.getState();
      const foundEmployee = findEmployeeById(data.assignedTo)(state);

      if (!foundEmployee) return;
      const licenseId = isEditSession ? data.licenseId : generateUniqueId();

      const transformedData: License = {
        ...data,
        status: 1 as const,
        licenseId,
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
        assignedLicenses: [
          ...(foundEmployee.assignedLicenses || []),
          licenseId,
        ],
      };

      await editEmployee(updatedEmployee);

      onCloseModal?.();
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
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
                onChange(selectedOption ? selectedOption.value : null)
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

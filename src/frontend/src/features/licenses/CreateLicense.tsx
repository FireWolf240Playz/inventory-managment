import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import { useSelector } from "react-redux";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ThemedForm from "../../ui/ThemedForm.tsx";
import { ThemedSelect } from "../../ui/ThemedSelect";

import { generateUniqueId } from "../../store/slices/entityUtils";
import {
  selectAllEmployees,
  findEmployeeById,
} from "../../store/slices/employees/selectors";
import { selectLicenseTypeOptions } from "../../store/slices/licenses/selectors";

import store from "../../store/store";
import { createLicense, editLicense } from "../../services/apiLicenses";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEmployee } from "../../services/apiEmployees";
import { License } from "../../store/slices/licenses/licensesSlice";
import { Employee } from "../../store/slices/employees/employeeSlice";

interface LicenseData {
  licenseId: string;
  licenseName: string;
  type: string;
  assignedTo: string; // or employee ID
  department: string;
  status: number; // 0 | 1 | 2, or store as string
  description: string;
}

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
  const isDarkMode = document.documentElement.classList.contains("dark-mode");

  const queryClient = useQueryClient();
  const createMutation = useMutation<void, Error, License>({
    mutationFn: createLicense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["licenses"] });
      toast.success("Successfully created new license");
    },
  });
  const editMutation = useMutation<void, Error, License>({
    mutationFn: editLicense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["licenses"] });
      toast.success("Successfully updated license");
    },
    onError: () => {
      toast.error("Something went wrong while updating license");
    },
  });

  const allEmployees = useSelector(selectAllEmployees);
  const typeLicenseOptions = useSelector(selectLicenseTypeOptions);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LicenseData>({
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

  const onSubmit: SubmitHandler<LicenseData> = async (data) => {
    try {
      const state = store.getState();
      const foundEmployee = findEmployeeById(data.assignedTo)(state);
      if (!foundEmployee) return;

      const newLicenseId = isEditSession ? data.licenseId : generateUniqueId();

      const transformedData: License = {
        ...data,
        licenseId: newLicenseId,
        status: 1 as const,
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
        assignedLicenses: [
          ...(foundEmployee.assignedLicenses || []),
          newLicenseId,
        ],
      };
      await editEmployee(updatedEmployee);

      onCloseModal?.();
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  const onError: SubmitErrorHandler<LicenseData> = (err) => {
    console.error("Form validation errors:", err);
  };

  return (
    <ThemedForm
      data-theme={isDarkMode ? "dark-mode" : "light-mode"}
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
            <ThemedSelect
              options={typeLicenseOptions}
              value={typeLicenseOptions.filter((opt) => value === opt.value)}
              onChange={(selectedOption) =>
                onChange(selectedOption ? selectedOption.value : "")
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
            <ThemedSelect
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
    </ThemedForm>
  );
}

export default CreateLicenseForm;

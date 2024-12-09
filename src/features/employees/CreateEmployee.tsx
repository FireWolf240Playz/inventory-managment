import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

interface EmployeeData {
  employeeId: string;
  employeeName: string;
  assignedDevices: string[] | null;
  department: string;
}

interface EmployeeToEdit {
  employeeId?: string;
  employeeName?: string;
  assignedDevices?: string[] | null;
  department?: string;
}

interface CreateEmployeeProps {
  employeeToEdit?: EmployeeToEdit;
  onCloseModal?: () => void;
}

function CreateEmployeeForm({
  employeeToEdit = {},
  onCloseModal,
}: CreateEmployeeProps) {
  const { employeeId = "", ...editValues } = employeeToEdit;
  const isEditSession = Boolean(employeeId);

  const { register, handleSubmit, reset, formState } = useForm<EmployeeData>({
    defaultValues: {
      employeeId: employeeId || "",
      employeeName: editValues.employeeName || "",
      assignedDevices: editValues.assignedDevices || [],
      department: editValues.department || "",
    },
  });
  const { errors } = formState;

  const onSubmit: SubmitHandler<EmployeeData> = (data) => {
    console.log("Form submitted:", data);
    if (onCloseModal) onCloseModal();
  };

  const onError: SubmitErrorHandler<EmployeeData> = (errors) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Employee ID" error={errors?.employeeId?.message}>
        <Input
          type="text"
          id="employeeId"
          {...register("employeeId", {
            required: "This field is required",
          })}
        />
      </FormRow>

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
        <Textarea
          id="assignedDevices"
          {...register("assignedDevices", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Department" error={errors?.department?.message}>
        <Input
          type="text"
          id="department"
          {...register("department", {
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
          {isEditSession ? "Edit Employee" : "Create Employee"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEmployeeForm;

import React, { FormEvent, useEffect } from "react";
import Select from "react-select";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

interface DeviceFilters {
  deviceId?: string;
  model?: string;
  status?: string;
  department?: string;
  assignedTo?: string | null;
}

interface Option {
  value: string;
  label: string;
}

interface AdvancedDeviceFilterFormProps {
  onApply: (filters: DeviceFilters) => void;
  onClear: () => void;
  departmentOptions: Option[];
  idOptions: Option[];
  statusOptions: Option[];
  modelOptions: Option[];
  assignedToOptions: Option[];
  initialFilters?: DeviceFilters;
}

const AdvancedDeviceFilterForm: React.FC<AdvancedDeviceFilterFormProps> = ({
  onApply,
  onClear,
  departmentOptions,
  statusOptions,
  modelOptions,
  idOptions,
  assignedToOptions,
  initialFilters = {},
}) => {
  const [filters, setFilters] = React.useState<DeviceFilters>({});

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleChange = (
    selectedOption: Option | null,
    name: keyof DeviceFilters,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: selectedOption?.value || undefined,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onApply(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  return (
    <Form type="modal" onSubmit={handleSubmit}>
      <FormRow label="Device ID">
        <Select
          options={idOptions}
          value={idOptions.find((opt) => opt.value === filters.deviceId)}
          onChange={(selected) => handleChange(selected, "deviceId")}
          isClearable
          placeholder="Select Device ID"
        />
      </FormRow>

      <FormRow label="Model">
        <Select
          options={modelOptions}
          value={modelOptions.find((opt) => opt.value === filters.model)}
          onChange={(selected) => handleChange(selected, "model")}
          isClearable
          placeholder="Select Model"
        />
      </FormRow>

      <FormRow label="Status">
        <Select
          options={statusOptions}
          value={statusOptions.find((opt) => opt.value === filters.status)}
          onChange={(selected) => handleChange(selected, "status")}
          isClearable
          placeholder="Select Status"
        />
      </FormRow>

      <FormRow label="Department">
        <Select
          options={departmentOptions}
          value={departmentOptions.find(
            (opt) => opt.value === filters.department,
          )}
          onChange={(selected) => handleChange(selected, "department")}
          isClearable
          placeholder="Select Department"
        />
      </FormRow>

      <FormRow label="Assigned To">
        <Select
          options={assignedToOptions}
          value={assignedToOptions.find(
            (opt) => opt.value === filters.assignedTo,
          )}
          onChange={(selected) => handleChange(selected, "assignedTo")}
          isClearable
          placeholder="Select User"
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="button" onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit">Apply</Button>
      </FormRow>
    </Form>
  );
};

export default AdvancedDeviceFilterForm;

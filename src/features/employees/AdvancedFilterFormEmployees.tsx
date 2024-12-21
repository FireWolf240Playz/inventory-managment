import Form from "../../ui/Form.tsx";
import FormRow from "../../ui/FormRow.tsx";
import Button from "../../ui/Button.tsx";
import { useState, FormEvent } from "react";

interface Filters {
  department?: string;
  employeeName?: string;
  employeeId?: string;
  role?: string;
}

interface AdvancedFilterFormProps {
  onApply: (filters: Filters) => void;
  onClear: () => void;
  departments: string[];
  roles: string[];
  employeeNames: string[];
  employeeIds: string[];
}

const AdvancedFilterFormEmployees: React.FC<AdvancedFilterFormProps> = ({
  onApply,
  onClear,
  departments,
  roles,
  employeeNames,
  employeeIds,
}) => {
  const [filters, setFilters] = useState<Filters>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "all" ? undefined : value,
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
      <FormRow label="Department">
        <select
          name="department"
          value={filters.department || "all"}
          onChange={handleChange}
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option value={dept} key={dept}>
              {dept}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Employee Name">
        <select
          name="employeeName"
          value={filters.employeeName || "all"}
          onChange={handleChange}
        >
          <option value="all">All Names</option>
          {employeeNames.map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Employee ID">
        <select
          name="employeeId"
          value={filters.employeeId || "all"}
          onChange={handleChange}
        >
          <option value="all">All IDs</option>
          {employeeIds.map((id) => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Role">
        <select
          name="role"
          value={filters.role || "all"}
          onChange={handleChange}
        >
          <option value="all">All Roles</option>
          {roles.map((role) => (
            <option value={role} key={role}>
              {role}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow>
        <Button variation="secondary" onClick={handleClear} type="button">
          Clear
        </Button>
        <Button type="submit">Apply</Button>
      </FormRow>
    </Form>
  );
};

export default AdvancedFilterFormEmployees;

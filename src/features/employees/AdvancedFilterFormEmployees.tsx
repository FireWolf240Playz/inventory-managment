import React, { FormEvent, useState, useEffect } from "react";
import Select from "react-select";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  clearFilters,
} from "../../store/slices/employees/employeeSlice";
import {
  selectEmployeesFilter,
  selectDepartmentOptions,
  selectEmployeeRoleOptions,
  selectEmployeeNameOptions,
  selectEmployeeIdOptions,
} from "../../store/slices/employees/selectors";
import { toggleAdvancedFilterSidebarEmployees } from "../../store/slices/appSlice";

const AdvancedFilterFormEmployees: React.FC = () => {
  const dispatch = useDispatch();

  const filters = useSelector(selectEmployeesFilter);
  const departmentOptions = useSelector(selectDepartmentOptions);
  const roleOptions = useSelector(selectEmployeeRoleOptions);
  const employeeNameOptions = useSelector(selectEmployeeNameOptions);
  const employeeIdOptions = useSelector(selectEmployeeIdOptions);

  const [localFilters, setLocalFilters] = useState(filters);

  // Sync local filters with Redux state
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (
    selectedOption: { value: string } | null,
    name: keyof typeof filters,
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: selectedOption?.value || undefined,
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    Object.entries(localFilters).forEach(([key, value]) => {
      dispatch(
        setFilter({
          key: key as keyof typeof filters,
          value: value || "all",
        }),
      );
    });
    dispatch(toggleAdvancedFilterSidebarEmployees());
  };

  const handleClear = () => {
    setLocalFilters({});
    dispatch(clearFilters());
  };

  return (
    <Form type="modal" onSubmit={handleSubmit}>
      <FormRow label="Employee ID">
        <Select
          options={employeeIdOptions}
          value={employeeIdOptions.find(
            (opt) => opt.value === localFilters.employeeId,
          )}
          onChange={(selected) => handleChange(selected, "employeeId")}
          isClearable
          placeholder="Select Employee ID"
        />
      </FormRow>

      <FormRow label="Name">
        <Select
          options={employeeNameOptions}
          value={employeeNameOptions.find(
            (opt) => opt.value === localFilters.employeeName,
          )}
          onChange={(selected) => handleChange(selected, "employeeName")}
          isClearable
          placeholder="Select Employee Name"
        />
      </FormRow>

      <FormRow label="Department">
        <Select
          options={departmentOptions}
          value={departmentOptions.find(
            (opt) => opt.value === localFilters.department,
          )}
          onChange={(selected) => handleChange(selected, "department")}
          isClearable
          placeholder="Select Department"
        />
      </FormRow>

      <FormRow label="Role">
        <Select
          options={roleOptions}
          value={
            localFilters.role && localFilters.role.length > 0
              ? roleOptions.find((opt) => opt.value === localFilters.role![0])
              : null
          }
          onChange={(selected) => {
            setLocalFilters((prev) => ({
              ...prev,
              role: selected ? [selected.value] : [],
            }));
          }}
          isClearable
          placeholder="Select Role"
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

export default AdvancedFilterFormEmployees;

import React, { FormEvent, useState, useEffect } from "react";
import Select from "react-select";
import Form from "../../ui/Form.tsx";
import FormRow from "../../ui/FormRow.tsx";
import Button from "../../ui/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  clearFilters,
} from "../../store/slices/employees/employeeSlice.ts";
import {
  selectEmployeesFilter,
  selectDepartmentOptions,
  selectEmployeeRoleOptions,
  selectEmployeeNameOptions,
  selectEmployeeIdOptions,
  selectEmployeeLocationOptions,
} from "../../store/slices/employees/selectors.ts";
import { toggleAdvancedFilterSidebarEmployees } from "../../store/slices/appSlice.ts";

import { MultiValue } from "react-select";

export interface OptionType {
  value: string;
  label: string;
}

const AdvancedFilterFormEmployees: React.FC = () => {
  const dispatch = useDispatch();

  // Grab the current filter values from Redux
  const filters = useSelector(selectEmployeesFilter);

  const departmentOptions = useSelector(selectDepartmentOptions);
  const roleOptions = useSelector(selectEmployeeRoleOptions);
  const employeeNameOptions = useSelector(selectEmployeeNameOptions);
  const employeeIdOptions = useSelector(selectEmployeeIdOptions);
  const employeeLocationOptions = useSelector(selectEmployeeLocationOptions);

  const [localFilters, setLocalFilters] = useState(filters);

  // Keep localFilters in sync if the Redux filters change externally
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  function handleChangeMultiSelect(
    selectedOptions: MultiValue<OptionType> | null,
    name: keyof typeof filters,
  ) {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Dispatch each field to Redux
    Object.entries(localFilters).forEach(([key, value]) => {
      dispatch(
        setFilter({
          key: key as keyof typeof filters,
          value: value || "all",
        }),
      );
    });
    // Close the sidebar
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
          isMulti
          options={employeeIdOptions}
          value={
            localFilters.employeeId
              ? employeeIdOptions.filter(
                  (opt) =>
                    localFilters.employeeId &&
                    localFilters.employeeId.includes(opt.value),
                )
              : []
          }
          onChange={(selectedOptions) =>
            setLocalFilters((prev) => ({
              ...prev,
              employeeId: Array.isArray(selectedOptions)
                ? selectedOptions.map((opt) => opt.value)
                : [],
            }))
          }
          isClearable
          placeholder="Select Employee ID(s)"
        />
      </FormRow>

      <FormRow label="Name">
        <Select
          isMulti
          options={employeeNameOptions}
          value={
            localFilters.employeeName
              ? employeeNameOptions.filter(
                  (opt) =>
                    localFilters.employeeName &&
                    localFilters.employeeName.includes(opt.value),
                )
              : []
          }
          onChange={(selected) =>
            handleChangeMultiSelect(selected, "employeeName")
          }
          isClearable
          placeholder="Select Employee Name(s)"
        />
      </FormRow>

      <FormRow label="Department">
        <Select
          isMulti
          options={departmentOptions}
          value={
            localFilters.department
              ? departmentOptions.filter(
                  (opt) =>
                    localFilters.department &&
                    localFilters.department.includes(opt.value),
                )
              : []
          }
          onChange={(selected) =>
            handleChangeMultiSelect(selected, "department")
          }
          isClearable
          placeholder="Select Department(s)"
        />
      </FormRow>

      <FormRow label="Location">
        <Select
          isMulti
          options={employeeLocationOptions}
          value={
            localFilters.location
              ? employeeLocationOptions.filter(
                  (opt) =>
                    localFilters.location &&
                    localFilters.location.includes(opt.value),
                )
              : []
          }
          onChange={(selected) => handleChangeMultiSelect(selected, "location")}
          isClearable
          placeholder="Select Employee Location"
        />
      </FormRow>

      <FormRow label="Role">
        <Select
          isMulti
          options={roleOptions}
          value={
            localFilters.role
              ? roleOptions.filter((opt) =>
                  (localFilters.role as string[]).includes(opt.value),
                )
              : []
          }
          onChange={(selected) => handleChangeMultiSelect(selected, "role")}
          isClearable
          placeholder="Select Role(s)"
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

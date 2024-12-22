import React, { FormEvent, useState, useEffect } from "react";
import Select from "react-select";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  clearFilters,
} from "../../store/slices/devices/deviceSlice";
import {
  selectDeviceFilters,
  selectDepartmentOptions,
  selectIdOptions,
  selectStatusOptions,
  selectModelOptions,
  selectAssignedToOptions,
} from "../../store/slices/devices/selectors";

import { toggleAdvancedFilterSidebarDevices } from "../../store/slices/appSlice.ts";

import { DeviceState } from "../../store/slices/devices/deviceSlice";

const AdvancedDeviceFilterForm: React.FC = () => {
  const dispatch = useDispatch();

  // Redux filters and options
  const filters = useSelector(selectDeviceFilters);
  const departmentOptions = useSelector(selectDepartmentOptions);
  const idOptions = useSelector(selectIdOptions);
  const statusOptions = useSelector(selectStatusOptions);
  const modelOptions = useSelector(selectModelOptions);
  const assignedToOptions = useSelector(selectAssignedToOptions);

  // Local state to manage form values before submission
  const [localFilters, setLocalFilters] =
    useState<DeviceState["filters"]>(filters);

  // Sync local state with Redux when filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Update local state on selection change
  const handleChange = (
    selectedOption: { value: string } | null,
    name: keyof DeviceState["filters"],
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: selectedOption?.value || undefined,
    }));
  };

  // Apply filters on form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    Object.entries(localFilters).forEach(([key, value]) => {
      dispatch(
        setFilter({
          key: key as keyof DeviceState["filters"],
          value: value || "all",
        }),
      );
    });

    dispatch(toggleAdvancedFilterSidebarDevices());
  };

  const handleClear = () => {
    setLocalFilters({});
    dispatch(clearFilters());
  };

  return (
    <Form type="modal" onSubmit={handleSubmit}>
      <FormRow label="Device ID">
        <Select
          options={idOptions}
          value={idOptions.find((opt) => opt.value === localFilters.deviceId)}
          onChange={(selected) => handleChange(selected, "deviceId")}
          isClearable
          placeholder="Select Device ID"
        />
      </FormRow>

      <FormRow label="Model">
        <Select
          options={modelOptions}
          value={modelOptions.find((opt) => opt.value === localFilters.model)}
          onChange={(selected) => handleChange(selected, "model")}
          isClearable
          placeholder="Select Model"
        />
      </FormRow>

      <FormRow label="Status">
        <Select
          options={statusOptions}
          value={statusOptions.find((opt) => opt.value === localFilters.status)}
          onChange={(selected) => handleChange(selected, "status")}
          isClearable
          placeholder="Select Status"
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

      <FormRow label="Assigned To">
        <Select
          options={assignedToOptions}
          value={assignedToOptions.find(
            (opt) => opt.value === localFilters.assignedTo,
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

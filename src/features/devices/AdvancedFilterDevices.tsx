import React, { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdvancedFilterSidebarDevices } from "../../store/slices/appSlice.ts";
import { DeviceState } from "../../store/slices/devices/deviceSlice";
import { useSearchParams } from "react-router-dom";

import {
  setFilter,
  clearFilters,
} from "../../store/slices/devices/deviceSlice";
import {
  selectDeviceFilters,
  selectDepartmentOptions,
  selectIdOptions,
  selectModelOptions,
  selectAssignedToOptions,
} from "../../store/slices/devices/selectors";

import Select from "react-select";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

const AdvancedDeviceFilterForm: React.FC = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  // Redux filters and options
  const filters = useSelector(selectDeviceFilters);
  const departmentOptions = useSelector(selectDepartmentOptions);
  const idOptions = useSelector(selectIdOptions);

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
    const newSearchParams = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(localFilters)) {
      if (value && value !== "all") {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    }
    setSearchParams(newSearchParams);

    dispatch(toggleAdvancedFilterSidebarDevices());
  };

  const handleClear = () => {
    setLocalFilters({});
    dispatch(clearFilters());

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete("deviceId");
    newSearchParams.delete("model");
    newSearchParams.delete("status");
    newSearchParams.delete("department");
    newSearchParams.delete("assignedTo");

    setSearchParams(newSearchParams);
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

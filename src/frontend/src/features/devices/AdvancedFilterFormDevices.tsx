import React, { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdvancedFilterSidebarDevices } from "../../store/slices/appSlice.ts";
import { DeviceFilters } from "../../store/slices/devices/deviceSlice.ts";
import { useSearchParams } from "react-router-dom";

import {
  setFilter,
  clearFilters,
} from "../../store/slices/devices/deviceSlice.ts";
import {
  selectDeviceFilters,
  selectDepartmentOptions,
  selectIdOptions,
  selectModelOptions,
  selectAssignedToOptions,
} from "../../store/slices/devices/selectors.ts";

import Select from "react-select";
import FormRow from "../../ui/FormRow.tsx";
import Form from "../../ui/Form.tsx";
import Button from "../../ui/Button.tsx";

import { MultiValue } from "react-select";
import { OptionType } from "../employees/AdvancedFilterFormEmployees.tsx";

const AdvancedDeviceFilterForm: React.FC = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  // Redux filters and options

  const filters = useSelector(selectDeviceFilters);
  const departmentOptions = useSelector(selectDepartmentOptions);
  const idOptions = useSelector(selectIdOptions);
  const modelOptions = useSelector(selectModelOptions);
  const assignedToOptions = useSelector(selectAssignedToOptions);

  const [localFilters, setLocalFilters] = useState<DeviceFilters>(filters);

  // Sync local state with Redux when filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Update local state on selection change
  function handleChangeMultiSelect(
    selectedOptions: MultiValue<OptionType> | null,
    name: keyof typeof filters,
  ) {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  }

  // Apply filters on form submission
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
    dispatch(toggleAdvancedFilterSidebarDevices());

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
          isMulti
          value={
            localFilters.deviceId
              ? idOptions.filter(
                  (opt) =>
                    localFilters.deviceId &&
                    localFilters.deviceId.includes(opt.value),
                )
              : []
          }
          onChange={(selected) => handleChangeMultiSelect(selected, "deviceId")}
          isClearable
          placeholder="Select Device ID"
        />
      </FormRow>

      <FormRow label="Model">
        <Select
          options={modelOptions}
          isMulti
          value={
            localFilters.model
              ? modelOptions.filter(
                  (opt) =>
                    localFilters.model &&
                    localFilters.model.includes(opt.value),
                )
              : []
          }
          onChange={(selected) => handleChangeMultiSelect(selected, "model")}
          isClearable
          placeholder="Select Model"
        />
      </FormRow>

      <FormRow label="Department">
        <Select
          options={departmentOptions}
          isMulti
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
          placeholder="Select Department"
        />
      </FormRow>

      <FormRow label="Assigned To">
        <Select
          options={assignedToOptions}
          isMulti
          value={
            localFilters.assignedTo
              ? assignedToOptions.filter(
                  (opt) =>
                    localFilters.assignedTo &&
                    localFilters.assignedTo.includes(opt.value),
                )
              : []
          }
          onChange={(selected) =>
            handleChangeMultiSelect(selected, "assignedTo")
          }
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

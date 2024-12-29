import React, { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Select, { MultiValue } from "react-select";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

import {
  setFilter,
  clearFilters,
} from "../../store/slices/licenses/licensesSlice.ts";

import {
  selectLicenseFilters,
  selectLicenseIdOptions,
  selectLicenseNameOptions,
  selectLicenseTypeOptions,
  selectLicenseDepartmentOptions,
  selectLicenseAssignedToOptions,
  selectLicenseStatusOptions,
} from "../../store/slices/licenses/selectors";
import { toggleAdvancedFilterLicenses } from "../../store/slices/appSlice.ts";

import { LicenseFilters } from "../../store/slices/licenses/licensesSlice.ts";

export interface OptionType {
  value: string;
  label: string;
}

const AdvancedLicenseFilterForm: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useSelector(selectLicenseFilters);
  const licenseIdOptions = useSelector(selectLicenseIdOptions);
  const licenseNameOptions = useSelector(selectLicenseNameOptions);
  const licenseTypeOptions = useSelector(selectLicenseTypeOptions);
  const licenseDepartmentOptions = useSelector(selectLicenseDepartmentOptions);
  const licenseAssignedToOptions = useSelector(selectLicenseAssignedToOptions);
  const licenseStatusOptions = useSelector(selectLicenseStatusOptions);

  // Local state to manage form values before dispatch
  const [localFilters, setLocalFilters] = useState<LicenseFilters>(filters);

  // 2) Keep local state in sync with Redux
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // 3) For multi-select fields, we transform the selectedOptions => string[]
  function handleChangeMultiSelect(
    selectedOptions: MultiValue<OptionType> | null,
    fieldName: keyof LicenseFilters,
  ) {
    setLocalFilters((prev) => ({
      ...prev,
      [fieldName]: selectedOptions
        ? selectedOptions.map((opt) => opt.value)
        : [],
    }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    Object.entries(localFilters).forEach(([key, value]) => {
      dispatch(
        setFilter({
          key: key as keyof LicenseFilters,
          value: value || "all",
        }),
      );
    });

    // B) Update the query params
    const newSearchParams = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(localFilters)) {
      if (value && value !== "all") {
        if (Array.isArray(value)) {
          newSearchParams.set(key, value.join(","));
        } else {
          newSearchParams.set(key, value);
        }
      } else {
        newSearchParams.delete(key);
      }
    }
    setSearchParams(newSearchParams);

    dispatch(toggleAdvancedFilterLicenses());
  };

  // 5) Clear all filters
  const handleClear = () => {
    setLocalFilters({});
    dispatch(clearFilters());

    const newSearchParams = new URLSearchParams(searchParams.toString());
    // Remove all relevant fields
    [
      "licenseId",
      "licenseName",
      "type",
      "assignedTo",
      "department",
      "status",
    ].forEach((k) => newSearchParams.delete(k));
    setSearchParams(newSearchParams);
  };

  return (
    <Form type="modal" onSubmit={handleSubmit}>
      <FormRow label="License ID">
        <Select
          isMulti
          options={licenseIdOptions}
          value={
            localFilters.licenseId
              ? licenseIdOptions.filter((opt) =>
                  (localFilters.licenseId as string[]).includes(opt.value),
                )
              : []
          }
          onChange={(selected) =>
            handleChangeMultiSelect(selected, "licenseId")
          }
          isClearable
          placeholder="Select License ID(s)"
        />
      </FormRow>

      <FormRow label="License Name">
        <Select
          isMulti
          options={licenseNameOptions}
          value={
            localFilters.licenseName
              ? licenseNameOptions.filter((opt) =>
                  (localFilters.licenseName as string[]).includes(opt.value),
                )
              : []
          }
          onChange={(selected) =>
            handleChangeMultiSelect(selected, "licenseName")
          }
          isClearable
          placeholder="Select License Name(s)"
        />
      </FormRow>

      <FormRow label="Type">
        <Select
          isMulti
          options={licenseTypeOptions}
          value={
            localFilters.type
              ? licenseTypeOptions.filter((opt) =>
                  (localFilters.type as string[]).includes(opt.value),
                )
              : []
          }
          onChange={(selected) => handleChangeMultiSelect(selected, "type")}
          isClearable
          placeholder="Select License Type(s)"
        />
      </FormRow>

      <FormRow label="Assigned To">
        <Select
          isMulti
          options={licenseAssignedToOptions}
          value={
            localFilters.assignedTo
              ? licenseAssignedToOptions.filter((opt) =>
                  (localFilters.assignedTo as string[]).includes(opt.value),
                )
              : []
          }
          onChange={(selected) =>
            handleChangeMultiSelect(selected, "assignedTo")
          }
          isClearable
          placeholder="Select User(s)"
        />
      </FormRow>

      <FormRow label="Department">
        <Select
          isMulti
          options={licenseDepartmentOptions}
          value={
            localFilters.department
              ? licenseDepartmentOptions.filter((opt) =>
                  (localFilters.department as string[]).includes(opt.value),
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

      <FormRow label="Status">
        <Select
          isMulti
          options={licenseStatusOptions}
          value={
            localFilters.status
              ? licenseStatusOptions.filter((opt) =>
                  (localFilters.status as string[]).includes(opt.value),
                )
              : []
          }
          onChange={(selected) => handleChangeMultiSelect(selected, "status")}
          isClearable
          placeholder="Select License Status"
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

export default AdvancedLicenseFilterForm;

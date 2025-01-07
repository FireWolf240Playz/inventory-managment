import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";
import Modal from "../../ui/Modal.tsx";
import Pagination from "../../ui/Pagination.tsx";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar.tsx";
import AdvancedFilterFormLicenses from "./AdvancedFilterFormLicenses.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateLicense from "./CreateLicense.tsx";
import ViewWindow from "../../ui/ViewWindow.tsx";
import Tag from "../../ui/Tag.tsx";
import Spinner from "../../ui/Spinner.tsx";

import {
  selectFilteredLicenses,
  statusMapToStringLicenses,
} from "../../store/slices/licenses/selectors.ts";
import { toggleAdvancedFilterLicenses } from "../../store/slices/appSlice.ts";
import {
  setLicenses,
  License,
} from "../../store/slices/licenses/licensesSlice.ts";
import { selectEmployeesMap } from "../../store/slices/employees/selectors.ts";
import { RootState } from "../../store/store.ts";

import { getLicenses } from "../../services/apiLicenses.ts";
import { getEmployees } from "../../services/apiEmployees.ts";
import {
  Employee,
  setEmployees,
} from "../../store/slices/employees/employeeSlice.ts";

import { PAGE_SIZE } from "../../utils/constants.ts";

function LicenseTable() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // Fetch licenses
  const {
    data: licenses,
    isLoading: isLicensesLoading,
    isError: isLicensesError,
    error: licensesError,
  } = useQuery<License[], Error>({
    queryKey: ["licenses"],
    queryFn: getLicenses,
  });

  // Fetch employees
  const {
    data: employees,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
    error: employeesError,
  } = useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  useEffect(() => {
    if (employees) dispatch(setEmployees(employees));
  }, [dispatch, employees]);

  useEffect(() => {
    if (licenses) dispatch(setLicenses(licenses));
  }, [dispatch, licenses]);

  const filteredLicensesAdvanced = useSelector(selectFilteredLicenses);

  const employeesMap = useSelector(selectEmployeesMap);

  const currentFilter = searchParams.get("status") || "all";
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const statusOption = Object.keys(statusMapToStringLicenses).find(
    (key) => key === currentFilter,
  );
  const statusCode = statusOption ? Number(statusOption) : null;

  const filteredLicenses =
    statusCode === null
      ? filteredLicensesAdvanced
      : filteredLicensesAdvanced?.filter(
          (license) => license.status === statusCode,
        ) ?? [];

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;
  const paginatedLicenses = filteredLicenses.slice(startIndex, endIndex);

  const isCollapsedAdvancedSidebarLicenses = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarLicenses,
  );

  const handleCloseFilterSidebar = () =>
    dispatch(toggleAdvancedFilterLicenses());

  if (isLicensesLoading || isEmployeesLoading) return <Spinner />;

  if (isLicensesError)
    return <div>Error loading licenses: {licensesError.message}</div>;
  if (isEmployeesError)
    return <div>Error loading employees: {employeesError.message}</div>;

  return (
    <>
      {/* Advanced Filter Sidebar */}
      {isCollapsedAdvancedSidebarLicenses && (
        <AdvancedFilterSidebar
          isOpen={isCollapsedAdvancedSidebarLicenses}
          onClose={handleCloseFilterSidebar}
        >
          <AdvancedFilterFormLicenses />
        </AdvancedFilterSidebar>
      )}

      {/* Licenses Table */}
      <Menus>
        <Table columns="0.8fr 1fr 1fr 1fr 1fr 1fr 0.5fr">
          <Table.Header>
            <div>License ID</div>
            <div>Name</div>
            <div>Status</div>
            <div>Type</div>
            <div>Assigned To</div>
            <div>Department</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={paginatedLicenses}
            render={(license) => {
              return (
                <Table.Row key={license.licenseId}>
                  <div data-label="License ID:"> {license.licenseId}</div>
                  <div data-label="Name:">
                    <span>{license.licenseName}</span>
                  </div>
                  <div data-label="Status:">
                    <Tag status={license.status} />
                  </div>
                  <div data-label="Type:">{license.type}</div>
                  <div data-label="Assigned To:">
                    {license.assignedTo && employeesMap[license.assignedTo]
                      ? employeesMap[license.assignedTo].employeeName
                      : "Not assigned"}
                  </div>

                  <div data-label="Department:">
                    {license.department || "No department"}
                  </div>
                  <div data-label="Actions:">
                    <Modal>
                      <Menus.Menu>
                        <Menus.Toggle id={license.licenseId} />

                        <Menus.List id={license.licenseId}>
                          <Modal.Open opens="editLicense">
                            <Menus.Button icon={<HiPencil />}>
                              Edit
                            </Menus.Button>
                          </Modal.Open>

                          <Modal.Open opens="deleteLicense">
                            <Menus.Button icon={<HiTrash />}>
                              Delete
                            </Menus.Button>
                          </Modal.Open>

                          <Modal.Open opens="viewLicense">
                            <Menus.Button icon={<HiEye />}>View</Menus.Button>
                          </Modal.Open>
                        </Menus.List>

                        <Modal.Window name="editLicense">
                          <CreateLicense licenseToEdit={license} />
                        </Modal.Window>

                        <Modal.Window name="deleteLicense">
                          <ConfirmDelete
                            resourceName="licenses"
                            id={license.licenseId}
                          />
                        </Modal.Window>

                        <Modal.Window name="viewLicense">
                          <ViewWindow
                            details={{
                              "License ID": license.licenseId,
                              Name: license.licenseName,
                              Type: license.type,
                              "Assigned To":
                                license.assignedTo &&
                                employeesMap[license.assignedTo]
                                  ? employeesMap[license.assignedTo]
                                      .employeeName
                                  : "Unassigned",
                              Status:
                                statusMapToStringLicenses[license.status] ||
                                "Unknown status",
                              Department: license.department || "No department",
                            }}
                          />
                        </Modal.Window>
                      </Menus.Menu>
                    </Modal>
                  </div>
                </Table.Row>
              );
            }}
          />
          <Table.Footer>
            <Pagination count={filteredLicenses.length} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default LicenseTable;

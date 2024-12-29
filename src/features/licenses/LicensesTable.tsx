import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../../store/store";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { HiPencil, HiSquare2Stack, HiTrash, HiEye } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar";
import AdvancedFilterFormLicenses from "./AdvancedFilterFormLicenses";
import Pagination from "../../ui/Pagination";
import ViewWindow from "../../ui/ViewWindow";

import {
  selectFilteredLicenses,
  statusMapToStringLicenses,
} from "../../store/slices/licenses/selectors";

import { toggleAdvancedFilterLicenses } from "../../store/slices/appSlice.ts";

import {
  duplicateLicense,
  deleteLicense,
} from "../../store/slices/licenses/licensesSlice.ts";

import { PAGE_SIZE } from "../../utils/constants";
import CreateLicense from "./CreateLicense.tsx";

function LicenseTable() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const isCollapsedAdvancedSidebarLicenses = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarLicenses,
  );

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  const licenses = useSelector(selectFilteredLicenses);

  const paginatedLicenses = licenses.slice(startIndex, endIndex);

  const handleCloseFilterSidebar = () => {
    dispatch(toggleAdvancedFilterLicenses());
  };

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

      <Menus>
        <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>License ID</div>
            <div>Name</div>
            <div>Type</div>
            <div>Assigned To</div>
            <div>Status</div>
            <div>Department</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={paginatedLicenses}
            render={(license) => (
              <Table.Row key={license.licenseId}>
                <div data-label="License ID:">{license.licenseId}</div>
                <div data-label="Name:">{license.licenseName}</div>
                <div data-label="Type:">{license.type}</div>
                <div data-label="Assigned To:">
                  {license.assignedTo || "Unassigned"}
                </div>
                <div data-label="Status:">
                  {statusMapToStringLicenses[license.status]}
                </div>
                <div data-label="Department:">{license.department}</div>
                <div data-label="Actions:">
                  <Modal>
                    <Menus.Menu>
                      <Menus.Toggle id={license.licenseId} />

                      <Menus.List id={license.licenseId}>
                        <Menus.Button
                          icon={<HiSquare2Stack />}
                          onClick={() => dispatch(duplicateLicense(license))}
                        >
                          Duplicate
                        </Menus.Button>

                        <Modal.Open opens="editLicense">
                          <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                        </Modal.Open>

                        <Modal.Open opens="deleteLicense">
                          <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
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
                          onConfirm={() =>
                            dispatch(deleteLicense(license.licenseId))
                          }
                        />
                      </Modal.Window>

                      <Modal.Window name="viewLicense">
                        <ViewWindow
                          details={{
                            "License ID": license.licenseId,
                            Name: license.licenseName,
                            Type: license.type,
                            "Assigned To": license.assignedTo || "Unassigned",
                            Status: statusMapToStringLicenses[license.status],
                            Department: license.department,
                          }}
                        />
                      </Modal.Window>
                    </Menus.Menu>
                  </Modal>
                </div>
              </Table.Row>
            )}
          />
          <Table.Footer>
            <Pagination count={licenses.length} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default LicenseTable;

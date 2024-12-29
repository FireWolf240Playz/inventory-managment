import Row from "../ui/Row";
import Heading from "../ui/Heading.tsx";
import Button from "../ui/Button.tsx";
import Modal from "../ui/Modal.tsx";
import { useWindowSize } from "@uidotdev/usehooks";
import { useDispatch } from "react-redux";
import { toggleAdvancedFilterLicenses } from "../store/slices/appSlice.ts";
import LicensesTable from "../features/licenses/LicensesTable.tsx";
import CreateLicense from "../features/licenses/CreateLicense.tsx";

function Licenses() {
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  return (
    <Modal>
      <Row type={width !== null && width < 800 ? "vertical" : "horizontal"}>
        <Heading as="h1">All Licenses</Heading>
      </Row>

      <Row
        type={width !== null && width < 800 ? "vertical" : "horizontal"}
        style={{ justifyContent: "end", gap: "2rem" }}
      >
        <div style={{ marginRight: "auto" }}>
          <Heading as="h2"> Quick actions</Heading>
        </div>
        <Modal.Open opens="createLicense">
          <Button
            style={{
              width: width !== null && width < 800 ? "100%" : "fit-content",
            }}
          >
            Add license
          </Button>
        </Modal.Open>
        <Button
          style={{
            width: width !== null && width < 800 ? "100%" : "fit-content",
          }}
          onClick={() => dispatch(toggleAdvancedFilterLicenses())}
        >
          Advanced filter
        </Button>
      </Row>
      <Row>
        <LicensesTable />
      </Row>
      <Modal.Window name="createLicense">
        <CreateLicense />
      </Modal.Window>
    </Modal>
  );
}

export default Licenses;

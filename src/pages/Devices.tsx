import Row from "../ui/Row.tsx";
import Heading from "../ui/Heading.tsx";
import DevicesTable from "../features/devices/DevicesTable.tsx";
import Filter from "../ui/Filter.tsx";
import Modal from "../ui/Modal.tsx";
import Button from "../ui/Button.tsx";
import CreateDevice from "../features/devices/CreateDevice.tsx";
import { useWindowSize } from "@uidotdev/usehooks";

function Devices() {
  const { width } = useWindowSize();

  return (
    <Modal>
      <Row type={width !== null && width < 700 ? "vertical" : "horizontal"}>
        <Heading as="h1">All devices</Heading>

        <Filter
          filterField="status"
          options={[
            { value: "all", label: "All devices" },
            { value: "available", label: "Available" },
            { value: "under-maintenance", label: "Under maintenance" },
            { value: "in-use", label: "In use" },
          ]}
        />
      </Row>
      <Modal.Open opens="createDevice">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              width: width !== null && width < 700 ? "100%" : "fit-content",
            }}
          >
            Add device
          </Button>
        </div>
      </Modal.Open>
      <Row>
        <DevicesTable />
      </Row>
      <Modal.Window name="createDevice">
        <CreateDevice />
      </Modal.Window>
    </Modal>
  );
}

export default Devices;

import Row from "../ui/Row.tsx";
import Heading from "../ui/Heading.tsx";
import DevicesTable from "../features/devices/DevicesTable.tsx";
import Filter from "../ui/Filter.tsx";
import Modal from "../ui/Modal.tsx";
import Button from "../ui/Button.tsx";
import CreateDevice from "../features/devices/CreateDevice.tsx";
import { useWindowSize } from "@uidotdev/usehooks";
import { toggleAdvancedFilterSidebarDevices } from "../store/slices/appSlice.ts";
import { useDispatch } from "react-redux";

function Devices() {
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  return (
    <Modal>
      <Row type={width !== null && width < 800 ? "vertical" : "horizontal"}>
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
      <Row type={"horizontal"} style={{ justifyContent: "end", gap: "2rem" }}>
        <Modal.Open opens="createDevice">
          <Button
            style={{
              width: width !== null && width < 800 ? "100%" : "fit-content",
            }}
          >
            Add device
          </Button>
        </Modal.Open>
        <Button
          style={{
            width: width !== null && width < 800 ? "100%" : "fit-content",
          }}
          onClick={() => dispatch(toggleAdvancedFilterSidebarDevices())}
        >
          Advanced filter
        </Button>
      </Row>
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

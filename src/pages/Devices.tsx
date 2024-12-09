import Row from "../ui/Row.tsx";
import Heading from "../ui/Heading.tsx";
import DevicesTable from "../features/devices/DevicesTable.tsx";
import Filter from "../ui/Filter.tsx";

function Devices() {
  return (
    <>
      <Row type="horizontal">
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

      <Row>
        <DevicesTable />
      </Row>
    </>
  );
}

export default Devices;

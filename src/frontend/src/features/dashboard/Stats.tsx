import Stat from "./Stat.tsx";
import { HiMiniDeviceTablet } from "react-icons/hi2";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { FaExclamation } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";
import { useSelector } from "react-redux";
import {
  selectAvailableDevices,
  selectDevices,
  selectDevicesInUse,
  selectDevicesUnderMaintenance,
} from "../../store/slices/devices/selectors.ts";
import styled from "styled-components";

const StyledStatWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-items: start;
  gap: 1rem;

  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
`;

function Stats() {
  const allDevices = useSelector(selectDevices);
  const availableDevices = useSelector(selectAvailableDevices);
  const devicesInUse = useSelector(selectDevicesInUse);
  const devicesUnderMaintenance = useSelector(selectDevicesUnderMaintenance);

  return (
    <StyledStatWrapper>
      <Stat
        icon={<HiMiniDeviceTablet />}
        title={"All devices"}
        value={allDevices.length}
        color="green"
      />

      <Stat
        icon={<HiMiniDevicePhoneMobile />}
        title={"Available devices"}
        value={availableDevices.length}
        color="blue"
      />

      <Stat
        icon={<GrPersonalComputer />}
        title={"In use"}
        value={devicesInUse.length}
        color="green"
      />
      <Stat
        icon={<FaExclamation />}
        title={"Under maintenance"}
        value={devicesUnderMaintenance.length}
        color="yellow"
      />
    </StyledStatWrapper>
  );
}

export default Stats;

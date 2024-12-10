import Stat from "./Stat.tsx";
import { HiMiniDeviceTablet } from "react-icons/hi2";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { FaExclamation } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";
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
  return (
    <StyledStatWrapper>
      <Stat
        icon={<HiMiniDeviceTablet />}
        title={"All devices"}
        value={30}
        color="green"
      />

      <Stat
        icon={<HiMiniDevicePhoneMobile />}
        title={"Available devices"}
        value={15}
        color="blue"
      />

      <Stat
        icon={<GrPersonalComputer />}
        title={"In use"}
        value={10}
        color="green"
      />
      <Stat
        icon={<FaExclamation />}
        title={"Under maintenance"}
        value={5}
        color="yellow"
      />
    </StyledStatWrapper>
  );
}

export default Stats;

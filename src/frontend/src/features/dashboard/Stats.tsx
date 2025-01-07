import styled from "styled-components";
import Stat from "./Stat.tsx";
import { HiMiniDeviceTablet, HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { FaExclamation } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";
import { useSelector } from "react-redux";
import { TbLicense } from "react-icons/tb";
import { MdOutlineEventAvailable } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { RiPassExpiredLine } from "react-icons/ri";
import Heading from "../../ui/Heading.tsx";
import SectionContent from "../../ui/SectionContent.tsx";
import Spinner from "../../ui/Spinner.tsx";
import {
  selectAvailableDevices,
  selectDevices,
  selectDevicesInUse,
  selectDevicesUnderMaintenance,
} from "../../store/slices/devices/selectors.ts";
import {
  selectAvailableLicenses,
  selectExpiredLicenses,
  selectLicenses,
  selectLicensesInUse,
} from "../../store/slices/licenses/selectors.ts";

import { useQuery } from "@tanstack/react-query";
import { getDevices } from "../../services/apiDevices.ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLicenses } from "../../services/apiLicenses.ts";
import { setDevices } from "../../store/slices/devices/deviceSlice.ts";
import { setLicenses } from "../../store/slices/licenses/licensesSlice.ts";

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionHeading = styled(Heading)`
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--color-grey-800);
`;

// Stats Component
function Stats() {
  const dispatch = useDispatch();
  const { data: devices, isLoading: isLoadingDevices } = useQuery({
    queryFn: getDevices,
    queryKey: ["devices"],
  });

  const { data: licenses, isLoading: isLoadingLicenses } = useQuery({
    queryFn: getLicenses,
    queryKey: ["licenses"],
  });

  useEffect(() => {
    if (devices && licenses) {
      dispatch(setDevices(devices));
      dispatch(setLicenses(licenses));
    }
  }, [dispatch, devices, licenses]);

  const allDevices = useSelector(selectDevices);
  const availableDevices = useSelector(selectAvailableDevices);
  const devicesInUse = useSelector(selectDevicesInUse);
  const devicesUnderMaintenance = useSelector(selectDevicesUnderMaintenance);

  const allLicenses = useSelector(selectLicenses);
  const availableLicenses = useSelector(selectAvailableLicenses);
  const licensesInUse = useSelector(selectLicensesInUse);
  const expiredLicenses = useSelector(selectExpiredLicenses);

  const statsData = {
    devices: [
      {
        title: "All devices",
        value: allDevices.length,
        icon: <HiMiniDeviceTablet />,
        color: "green",
      },
      {
        title: "Available devices",
        value: availableDevices.length,
        icon: <HiMiniDevicePhoneMobile />,
        color: "blue",
      },
      {
        title: "In use",
        value: devicesInUse.length,
        icon: <GrPersonalComputer />,
        color: "green",
      },
      {
        title: "Under maintenance",
        value: devicesUnderMaintenance.length,
        icon: <FaExclamation />,
        color: "yellow",
      },
    ],
    licenses: [
      {
        title: "All licenses",
        value: allLicenses.length,
        icon: <TbLicense />,
        color: "yellow",
      },
      {
        title: "Available licenses",
        value: availableLicenses.length,
        icon: <MdOutlineEventAvailable />,
        color: "green",
      },
      {
        title: "Licenses in use",
        value: licensesInUse.length,
        icon: <HiOutlineUser />,
        color: "indigo",
      },
      {
        title: "Expired licenses",
        value: expiredLicenses.length,
        icon: <RiPassExpiredLine />,
        color: "red",
      },
    ],
  };

  if (isLoadingDevices || isLoadingLicenses) return <Spinner />;

  return (
    <>
      {Object.entries(statsData).map(([section, stats]) => (
        <Section key={section}>
          <SectionHeading as="h3">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </SectionHeading>
          <SectionContent>
            {stats.map(({ title, value, icon, color }) => (
              <Stat
                key={title}
                icon={icon}
                title={title}
                value={value}
                color={color}
              />
            ))}
          </SectionContent>
        </Section>
      ))}
    </>
  );
}

export default Stats;

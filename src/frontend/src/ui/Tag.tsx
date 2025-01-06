import React from "react";
import styled from "styled-components";

// Define the possible purposes as a TypeScript union type
type Purpose = "devices" | "licenses";

// Define the possible status codes
type StatusCode = 0 | 1 | 2;

// Define the shape of each status mapping
interface StatusMapping {
  text: string;
  color: string;
}

// Define the props for the Tag component
interface TagProps {
  status: StatusCode;
  purpose: Purpose;
}

// Status mappings for devices
const statusMapDevices: Record<StatusCode, StatusMapping> = {
  0: {
    text: "Available",
    color: "indigo",
  },
  1: {
    text: "In Use",
    color: "green",
  },
  2: {
    text: "Maintenance",
    color: "yellow",
  },
};

// Status mappings for licenses
const statusMapLicenses: Record<StatusCode, StatusMapping> = {
  0: {
    text: "Available",
    color: "indigo",
  },
  1: {
    text: "In Use",
    color: "green",
  },
  2: {
    text: "Expired",
    color: "red",
  },
};

const StyledTag = styled.span<{ color: string }>`
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  color: var(--color-${(props) => props.color}-700);
  background-color: var(--color-${(props) => props.color}-100);
`;

const Tag: React.FC<TagProps> = ({ status, purpose }) => {
  const statusMap =
    purpose === "devices" ? statusMapDevices : statusMapLicenses;

  const statusDetails = statusMap[status] || { text: "Unknown", color: "gray" };

  return (
    <StyledTag color={statusDetails.color}>{statusDetails.text}</StyledTag>
  );
};

export default Tag;

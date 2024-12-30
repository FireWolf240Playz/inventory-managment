import styled from "styled-components";

interface TagProps {
  status: 0 | 1 | 2; // Define the possible status values
}

const statusMap = {
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

const StyledTag = styled.span<{ color: string }>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  color: var(--color-${(props) => props.color}-700);
  background-color: var(--color-${(props) => props.color}-100);
`;

function Tag({ status }: TagProps) {
  const { text, color } = statusMap[status];

  return <StyledTag color={color}>{text}</StyledTag>;
}

export default Tag;

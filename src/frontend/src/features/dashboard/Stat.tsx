import styled from "styled-components";
import { ReactNode } from "react";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media (max-width: 800px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface IconProps {
  color: string;
}

const Icon = styled.div<IconProps>`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;
const Title = styled.h5`
  font-size: 1.3rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--color-grey-700);
  @media (max-width: 1200px) {
    font-weight: 600;
    font-size: 1.3rem;
  }
`;

const Value = styled.p`
  font-size: 2rem;
  line-height: 1;
  @media (max-width: 1200px) {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

interface StatProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  color: string;
}

function Stat({ icon, title, value, color }: StatProps) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;

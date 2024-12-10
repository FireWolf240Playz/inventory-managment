import styled from "styled-components";
import React, { ReactNode } from "react";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  align-items: center;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    /* Styles when a button is present */
    flex-direction: row;
    gap: 1.2rem;
  }

  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

// Props Interface
interface FormRowProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

// Component
const FormRow: React.FC<FormRowProps> = ({ label, error, children }) => {
  const childProps = React.isValidElement(children)
    ? children.props
    : undefined;

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childProps?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;

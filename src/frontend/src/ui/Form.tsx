import styled, { css } from "styled-components";

interface FormProps {
  type?: "regular" | "modal"; // Define the accepted values for the `type` prop
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: fit-content;
    `}

    overflow: visible;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular", // Default prop value
};

export default Form;

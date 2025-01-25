import styled from "styled-components";
import Form from "./Form";

const ThemedForm = styled(Form)`
  &[data-theme="light-mode"] {
    input,
    textarea {
      background-color: #fff;
      color: #000;
      border: 1px solid #ccc;
    }
  }

  &[data-theme="dark-mode"] {
    input,
    textarea {
      background-color: #18212f;
      color: #fff;
      border: 1px solid #555;
    }
  }
`;

export default ThemedForm;

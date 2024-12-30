import styled from "styled-components";
import Button from "./Button.tsx";
import Heading from "./Heading.tsx";

const StyledConfirmDelete = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: center;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
    text-align: center;
  }

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
  }
`;

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
}

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled = false,
}: ConfirmDeleteProps) {
  return (
    <StyledConfirmDelete>
      <Heading as="h2" style={{ textAlign: "center" }}>
        Delete {resourceName}
      </Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? <br />
        This action cannot be undone.
      </p>

      <div>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
        <Button variation="secondary" disabled={disabled}>
          Cancel
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

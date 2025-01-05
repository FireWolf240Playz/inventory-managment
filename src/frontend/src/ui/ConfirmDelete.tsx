import styled from "styled-components";
import Button from "./Button.tsx";
import Heading from "./Heading.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDevice } from "../services/apiDevices.ts";
import { toast } from "react-hot-toast";

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
  id: string;
}

function ConfirmDelete({ resourceName, id }: ConfirmDeleteProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<void, Error, string>({
    mutationFn: deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries(["devices"]);
      toast.success("Successfully deleted device");
    },
    onError: () => {
      toast.error("Something went wrong while delete device");
    },
  });

  const handleDelete = () => {
    mutate(id);
  };

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
        <Button variation="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variation="secondary">Cancel</Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

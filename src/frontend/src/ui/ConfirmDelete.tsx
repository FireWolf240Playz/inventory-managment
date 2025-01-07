import styled from "styled-components";
import Button from "./Button.tsx";
import Heading from "./Heading.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { getDeleteFn } from "../services/deleteFunctions.ts";
import { useDispatch } from "react-redux";

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
  resourceName: "devices" | "employees" | "licenses";
  id: string;
}

function ConfirmDelete({ resourceName, id }: ConfirmDeleteProps) {
  const queryClient = useQueryClient();

  const mutationFn = getDeleteFn(resourceName);

  const { mutate } = useMutation<void, Error, string>({
    mutationFn: mutationFn,

    mutationKey: [resourceName],

    onSuccess: () => {
      // Invalidate so the resource list is refreshed
      queryClient.invalidateQueries([resourceName]);
      toast.success("Successfully deleted");
    },
    onError: () => {
      toast.error("Something went wrong while deleting");
    },
  });

  function handleClick() {
    mutate(id);
  }

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
        <Button variation="danger" onClick={handleClick} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
        <Button variation="secondary" disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

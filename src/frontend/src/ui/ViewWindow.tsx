import React from "react";
import styled from "styled-components";
import Heading from "./Heading.tsx";
import Modal from "./Modal.tsx";

interface ViewWindowProps {
  details: Record<string, string | string[] | null | undefined>;
}

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.6rem;
  width: 100%;
`;

const Details = styled.div`
  width: 100%;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);

  & span:first-child {
    font-weight: 500;
    color: var(--color-grey-800);
  }

  & span:last-child {
    color: var(--color-grey-600);
  }
`;

const ViewWindow: React.FC<ViewWindowProps> = ({ details }) => {
  return (
    <Modal>
      <Header>
        <Heading as="h4">Details</Heading>
      </Header>
      <Content>
        <Details>
          {Object.entries(details).map(([key, value]) => (
            <DetailItem key={key}>
              <span>{key}</span>
              <span>{value || "N/A"}</span>
            </DetailItem>
          ))}
        </Details>
      </Content>
    </Modal>
  );
};

export default ViewWindow;

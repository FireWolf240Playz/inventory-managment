import styled from "styled-components";
import { Overlay } from "./Modal.tsx";
import { HiX } from "react-icons/hi";
import { ReactNode, useEffect, useRef } from "react";
import Heading from "./Heading.tsx";
import { FocusTrap } from "focus-trap-react";

interface AdvancedFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: fit-content;
  max-width: 80rem;
  height: 100%;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 720px) {
    width: 80%;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const SidebarHeader = styled.div`
  padding: 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SidebarContent = styled.div`
  padding: 1.6rem;
  overflow-y: auto;
  height: calc(100% - 4.8rem); /* Adjust based on header height */
`;

const AdvancedFilterSidebar: React.FC<AdvancedFilterSidebarProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  // Handle focus trapping and accessibility
  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      const firstFocusable = sidebarRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  return (
    <Overlay isOpen={isOpen} onClick={onClose} aria-hidden={!isOpen}>
      {isOpen && (
        <FocusTrap>
          <SidebarContainer
            isOpen={isOpen}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="advanced-filter-title"
            ref={sidebarRef}
          >
            <SidebarHeader>
              <Heading as="h2">Advanced Filters</Heading>
              <Button onClick={onClose} aria-label="Close Advanced Filters">
                <HiX />
              </Button>
            </SidebarHeader>
            <SidebarContent>{children}</SidebarContent>
          </SidebarContainer>
        </FocusTrap>
      )}
    </Overlay>
  );
};

export default AdvancedFilterSidebar;

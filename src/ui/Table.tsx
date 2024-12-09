import { createContext, useContext, ReactNode, ReactElement } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

interface CommonRowProps {
  columns: string;
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* Hide footer when no child elements are present */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableContextType {
  columns: string;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

interface TableProps {
  columns: string; // CSS grid template columns
  children: ReactNode;
}

function Table({ columns, children }: TableProps): ReactElement {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps): ReactElement {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Header must be used within a Table.");
  }
  return (
    <StyledHeader role="row" columns={context.columns} as="header">
      {children}
    </StyledHeader>
  );
}

interface RowProps {
  children: ReactNode;
}

function Row({ children }: RowProps): ReactElement {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Row must be used within a Table.");
  }
  return (
    <StyledRow role="row" columns={context.columns}>
      {children}
    </StyledRow>
  );
}

interface BodyProps<T> {
  data: T[];
  render: (item: T, index: number) => ReactNode;
}

function Body<T>({ data, render }: BodyProps<T>): ReactElement {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

// Attach subcomponents to Table
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;

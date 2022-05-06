import { Summary } from "./Summary";
import { TransactionsTable } from "./TransactionsTable";
import { ContainerStyle } from "./styles";

export function Dashboard() {
  return (
    <ContainerStyle>
      <Summary />
      <TransactionsTable />
    </ContainerStyle>
  );
}
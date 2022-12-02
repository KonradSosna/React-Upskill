import { Container } from '@mui/material';
import { BasicTable } from './InvoicesTable';
import { StyledInvoiceContainer } from './InvoicesList.styles';

export const Invoices = () => {
  return (
    <StyledInvoiceContainer>
      <Container>
        <BasicTable />
      </Container>
    </StyledInvoiceContainer>
  );
};

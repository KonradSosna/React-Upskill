import { memo } from 'react';

import { Delete, Edit } from '@mui/icons-material';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { Invoice, Headers } from '../../intefaces/invoices';
import styled from 'styled-components';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const StyleTable = styled(Table)({
  minWidth: '650px',
});

const StyledDeleteIcon = styled(Delete)({
  margin: '0 10px',
});
const StyledEditteIcon = styled(Edit)({
  margin: '0 10px',
});

const StyledTableCell = styled(TableCell)((props) => ({
  textAlign: props.align,
}));

interface AppTableProps {
  list?: Invoice[];
  headers: Headers[];
  deleteInvoice: (id: string) => void;
  error?: FetchBaseQueryError | SerializedError;
}

const AppTable = memo(
  ({ list, headers, deleteInvoice, error }: AppTableProps) => {
    const navigate = useNavigate();

    return (
      <TableContainer component={Paper}>
        <StyleTable aria-label="simple table" role="table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell key={header.name} align={header.align}>
                  {header.name}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!error &&
              list?.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`invoices/${invoice.id}`}>{invoice.number}</Link>
                  </TableCell>
                  <TableCell align="right">{invoice.createdDate}</TableCell>
                  <TableCell align="right">{invoice.validDate}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => deleteInvoice(invoice.id)}
                      data-testid={`delete-invoice-${invoice.number}`}
                    >
                      <StyledDeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`invoices/${invoice.id}`)}
                      data-testid={`edit-invoice-${invoice.number}`}
                    >
                      <StyledEditteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {error && (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                  Error while featching data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyleTable>
      </TableContainer>
    );
  }
);

export default AppTable;

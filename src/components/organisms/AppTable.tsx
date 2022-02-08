import React from 'react';

import { Delete, Edit } from '@mui/icons-material';
import {
  Paper,
  styled,
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
  // eslint-disable-next-line react/prop-types
  textAlign: props.align,
}));

// eslint-disable-next-line react/display-name
const AppTable = React.memo(
  ({
    list,
    headers,
    deleteInvoice,
  }: {
    list: Invoice[];
    headers: Headers[];
    deleteInvoice: (id: string | number) => void;
  }) => {
    const navigate = useNavigate();

    return (
      <TableContainer component={Paper}>
        <StyleTable aria-label="simple table">
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
            {list.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell component="th" scope="row">
                  <Link to={`invoices/${invoice.id}`}>{invoice.number}</Link>
                </TableCell>
                <TableCell align="right">{invoice.createdDate}</TableCell>
                <TableCell align="right">{invoice.validDate}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => deleteInvoice(invoice.id)}>
                    <StyledDeleteIcon></StyledDeleteIcon>
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`invoices/${invoice.id}`)}
                  >
                    <StyledEditteIcon></StyledEditteIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyleTable>
      </TableContainer>
    );
  }
);

export default AppTable;

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
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Invoice, Headers } from '../../intefaces/invoices';

export default function AppTable({
  list,
  headers,
}: {
  list: Invoice[];
  headers: Headers[];
}) {
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
                <StyledDeleteIcon></StyledDeleteIcon>
                <StyledEditteIcon></StyledEditteIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyleTable>
    </TableContainer>
  );
}

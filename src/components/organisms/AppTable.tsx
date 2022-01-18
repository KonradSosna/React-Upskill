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

export default function AppTable() {
  const rows = [
    {
      number: 1,
      created: '22/4/202',
      validUntil: '6/12/21',
      amount: 1233,
    },
    {
      number: 2,
      created: '22/4/202',
      validUntil: '6/12/21',
      amount: 1233,
      props: {
        align: 'right',
      },
    },
    {
      number: 3,
      created: '22/4/202',
      validUntil: '6/12/21',
      amount: 1233,
    },
    {
      number: 4,
      created: '22/4/202',
      validUntil: '6/12/21',
      amount: 1233,
    },
    {
      number: 5,
      created: '22/4/202',
      validUntil: '6/12/21',
      amount: 1233,
    },
  ];
  interface Headers {
    name: string;
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  }
  const headers: Headers[] = [
    { name: 'No', align: 'inherit' },
    {
      name: 'Created',
      align: 'right',
    },
    {
      name: 'Valid until',
      align: 'right',
    },
    {
      name: 'Amount',
      align: 'right',
    },
    {
      name: 'Actions',
      align: 'right',
    },
  ];

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
          {rows.map((row) => (
            <TableRow key={row.number}>
              <TableCell component="th" scope="row">
                <Link to={`invoices/${row.number}`}>{row.number}</Link>
              </TableCell>
              <TableCell align="right">{row.created}</TableCell>
              <TableCell align="right">{row.validUntil}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
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

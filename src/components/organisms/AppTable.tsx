import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';

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
  const headers = [
    { name: 'No' },
    {
      name: 'Created',
      alignRight: true,
    },
    {
      name: 'Valid until',
      alignRight: true,
    },
    {
      name: 'Amount',
      alignRight: true,
    },
    {
      name: 'Actions',
      alignRight: true,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header.name}
                align={header.alignRight ? 'right' : 'inherit'}
              >
                {header.name}
              </TableCell>
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
                <Delete sx={{ margin: '0 10px' }}></Delete>
                <Edit sx={{ margin: '0 10px' }}></Edit>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

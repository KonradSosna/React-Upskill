import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { deleteInvoice, getInvoice, getInvoices } from '../../../services/api.service';
import { Invoice } from '../../../models/Invoice-model';
import { useNavigate } from 'react-router';
import { formatDate } from '../../../utils/helpers/parseDate';

export const BasicTable = () => {
  const [invoices, setInvoices] = useState<Invoice[]>();
  const [isInvoiceDeleted, setIsInvoiceDeleted] = useState(false);
  const navigate = useNavigate();

  const getListInvoices = () => {
    try {
      getInvoices().then((response) => {
        if (response) {
          setInvoices(response);
        }
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleEditInvoice = (id: string) => {
    try {
      getInvoice(id).then((response) => navigate('/edit', { state: { response } }));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleDeleteInvoice = (id: string) => {
    deleteInvoice(id);
    setIsInvoiceDeleted(!isInvoiceDeleted);
  };

  useEffect(() => {
    getListInvoices();
  }, [isInvoiceDeleted]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>No.</b>
            </TableCell>
            <TableCell align="right">
              <b>Created</b>
            </TableCell>
            <TableCell align="right">
              <b>Valid until</b>
            </TableCell>
            <TableCell align="right">
              <b>Amount</b>
            </TableCell>
            <TableCell align="right">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices?.map((row) => (
            <TableRow key={row.no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.no}
              </TableCell>
              <TableCell align="right">{formatDate(row.createdDate)}</TableCell>
              <TableCell align="right">{formatDate(row.validUntilDate)}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleEditInvoice(row.id)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDeleteInvoice(row.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

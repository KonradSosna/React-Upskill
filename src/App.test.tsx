/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('Testin App component', () => {
  test('render Suspens component', () => {
    render(<App></App>);
    const loading = screen.getByText('loading...');
    expect(loading).toBeInTheDocument();
  });

  test('render layout navigation', () => {
    render(<App />);
    const invoicesLink = screen.getByText('INVOICES');
    const addNewInvoiceLink = screen.getByText('ADD NEW INVOICE');
    expect(invoicesLink).toBeInTheDocument();
    expect(addNewInvoiceLink).toBeInTheDocument();
    expect(invoicesLink.closest('a')).toHaveAttribute('href', '/');
    expect(addNewInvoiceLink.closest('a')).toHaveAttribute('href', '/create');
  });

  test('render table', async () => {
    render(<App></App>);
    const table = screen.getByRole('table');
    await waitFor(() => expect(table).toBeInTheDocument());
  });
});

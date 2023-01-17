import * as React from 'react';
import { Route, Routes } from 'react-router';
import { PageNotFound } from './PageNotFound/PageNotFound';
import { Invoices } from './Sections/InvoicesList/InvoicesList';
import { InvoiceEditor } from './Sections/InvoiceEditor/InvoiceEditor';

export const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/invoices" element={<Invoices />} />
      <Route path={'/create'} element={<InvoiceEditor />} />
      <Route path={'/edit'} element={<InvoiceEditor isEditMode={true} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

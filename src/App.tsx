import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layout/Default';
import AppSuspense from './components/atoms/AppSuspense';

const Home = React.lazy(() => import('./pages/Home'));
const CreateInvoice = React.lazy(() => import('./pages/create'));
const Invoices = React.lazy(() => import('./pages/invoices/[id]'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout></DefaultLayout>}>
          <Route
            path="*"
            element={
              <React.Suspense fallback={<AppSuspense></AppSuspense>}>
                <NotFound />
              </React.Suspense>
            }
          ></Route>
          <Route
            index
            element={
              <React.Suspense fallback={<AppSuspense></AppSuspense>}>
                <Home />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="create"
            element={
              <React.Suspense fallback={<AppSuspense></AppSuspense>}>
                <CreateInvoice />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="invoices/:id"
            element={
              <React.Suspense fallback={<AppSuspense></AppSuspense>}>
                <Invoices />
              </React.Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

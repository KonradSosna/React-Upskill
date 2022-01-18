import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppSuspense from './components/atoms/AppSuspense';
import DefaultLayout from './layout/Default';
import './App.css';

const Invoices = React.lazy(() => import('./pages/Invoices'));
const Create = React.lazy(() => import('./pages/Create'));
const Invoice = React.lazy(() => import('./pages/Invoice'));
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
                <Invoices />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="create"
            element={
              <React.Suspense fallback={<AppSuspense></AppSuspense>}>
                <Create />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="invoices/:id"
            element={
              <React.Suspense fallback={<AppSuspense></AppSuspense>}>
                <Invoice />
              </React.Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

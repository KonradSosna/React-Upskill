import { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppSuspense from './components/atoms/AppSuspense';
import DefaultLayout from './layout/Default';
import './App.css';

const Invoices = lazy(() => import('./pages/Invoices'));
const Create = lazy(() => import('./pages/Create'));
const Invoice = lazy(() => import('./pages/Invoice'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout></DefaultLayout>}>
          <Route
            path="*"
            element={
              <Suspense fallback={<AppSuspense></AppSuspense>}>
                <NotFound />
              </Suspense>
            }
          ></Route>
          <Route
            index
            element={
              <Suspense fallback={<AppSuspense></AppSuspense>}>
                <Invoices />
              </Suspense>
            }
          ></Route>
          <Route
            path="create"
            element={
              <Suspense fallback={<AppSuspense></AppSuspense>}>
                <Create />
              </Suspense>
            }
          ></Route>
          <Route
            path="invoices/:id"
            element={
              <Suspense fallback={<AppSuspense></AppSuspense>}>
                <Invoice />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

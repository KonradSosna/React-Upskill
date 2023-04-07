import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { SnackbarProvider } from 'notistack';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppSuspense from './components/atoms/AppSuspense';
import DefaultLayout from './layout/Default';
import { invoicesApi, store } from './store/store';

const Invoices = lazy(() => import('./pages/Invoices'));
const Create = lazy(() => import('./pages/Create'));
const Invoice = lazy(() => import('./pages/Invoice'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ApiProvider api={invoicesApi}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DefaultLayout />}>
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<AppSuspense />}>
                      <NotFound />
                    </Suspense>
                  }
                ></Route>
                <Route
                  index
                  element={
                    <ErrorBoundary FallbackComponent={NotFound}>
                      <Suspense fallback={<AppSuspense />}>
                        <Invoices />
                      </Suspense>
                    </ErrorBoundary>
                  }
                ></Route>
                <Route
                  path="create"
                  element={
                    <ErrorBoundary FallbackComponent={NotFound}>
                      <Suspense fallback={<AppSuspense />}>
                        <Create />
                      </Suspense>
                    </ErrorBoundary>
                  }
                ></Route>
                <Route
                  path="invoices/:id"
                  element={
                    <ErrorBoundary FallbackComponent={NotFound}>
                      <Suspense fallback={<AppSuspense />}>
                        <Invoice />
                      </Suspense>
                    </ErrorBoundary>
                  }
                ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </ApiProvider>
  );
}

export default App;

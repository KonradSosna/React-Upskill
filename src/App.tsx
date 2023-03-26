import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppSuspense from './components/atoms/AppSuspense';
import DefaultLayout from './layout/Default';
import { store } from './store/store';

const Invoices = lazy(() => import('./pages/Invoices'));
const Create = lazy(() => import('./pages/Create'));
const Invoice = lazy(() => import('./pages/Invoice'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Provider store={store}>
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
                <Suspense fallback={<AppSuspense />}>
                  <Invoices />
                </Suspense>
              }
            ></Route>
            <Route
              path="create"
              element={
                <Suspense fallback={<AppSuspense />}>
                  <Create />
                </Suspense>
              }
            ></Route>
            <Route
              path="invoices/:id"
              element={
                <Suspense fallback={<AppSuspense />}>
                  <Invoice />
                </Suspense>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

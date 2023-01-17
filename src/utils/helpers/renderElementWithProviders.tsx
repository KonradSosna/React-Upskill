import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../../i18n';

export const renderElementWithProviders = (element: JSX.Element) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>{element}</BrowserRouter>
    </I18nextProvider>
  );
};

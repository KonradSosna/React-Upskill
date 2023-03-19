import { StrictMode } from 'react';

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { StyledEngineProvider } from '@mui/material';

// ReactDOM.render(
//   <StrictMode>
//     <StyledEngineProvider injectFirst>
//       <App />
//     </StyledEngineProvider>
//   </StrictMode>,
//   document.getElementById('root')
// );

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

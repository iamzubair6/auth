import '@fontsource-variable/noto-serif-bengali';
import '@fontsource/poppins';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalContext from './Global/GlobalContext';
import ThemeLayout from './Layouts/ThemeLayout';
import { queryClient } from './Utils/axiosApi';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        dense
        preventDuplicate
        maxSnack={3}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <GlobalContext>
          <ThemeLayout>
            <App />
          </ThemeLayout>
        </GlobalContext>
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

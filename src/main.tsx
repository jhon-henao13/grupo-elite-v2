import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App';
import './index.css';


if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      theme="dark"
      richColors
      toastOptions={{
        style: {
          background: 'rgba(10,15,26,0.95)',
          border: '1px solid rgba(251,191,36,0.2)',
          color: '#fff',
        },
      }}
    />
  </StrictMode>
);
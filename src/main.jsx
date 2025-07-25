
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from '@/App';
    import '@/index.css';
    import { Toaster } from '@/components/ui/toaster';

    // Apply dark theme by default
    document.documentElement.classList.add('dark');

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
    );
  
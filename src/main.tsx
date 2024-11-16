import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Читаем ключ из переменных окружения
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;



ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={clerkPublishableKey}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ClerkProvider>
);

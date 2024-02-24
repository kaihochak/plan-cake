import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.jsx'
import ReactModal from 'react-modal';
import AuthProvider from '@/context/AuthContext';
import QueryProvider from '@/lib/react-query/QueryProvider';

// Set the root element for react-modal
ReactModal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
)

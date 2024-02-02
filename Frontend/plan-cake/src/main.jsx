import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ReactModal from 'react-modal';

// Set the root element for react-modal
ReactModal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

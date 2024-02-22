import React from 'react';
import './Blob.css';
import BlobShape from '../assets/blob.svg';

function Layout({ children }) {
    return (
      <div className="relative overflow-hidden h-screen">
        <img src={BlobShape} className="blob" alt="blob" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

export default Layout;
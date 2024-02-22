import React from 'react';
import './Blob.css';
import BlobShape from './assets/blob.svg';

function Blob() {
    return (
      <div className="bg-[#13151b] flex justify-center items-center h-screen">
        <img src={BlobShape} className="blob" alt="blob" />
      </div>
    );
  }

export default Blob;
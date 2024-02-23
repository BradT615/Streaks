import React from 'react';
import Wave from '../assets/wave.svg';

function Layout({ children }) {
  return (
    <div className="bg-[#13151b] flex flex-col justify-between h-screen relative">
        <img src={Wave} className="blob absolute w-full h-full object-cover" alt="blob" />
        <div className="relative z-10 flex-grow flex items-center justify-center">{children}</div>
    </div>
  );
}

export default Layout;
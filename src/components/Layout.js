import React from 'react';
import Wave from '../assets/wave.svg';

function Layout({ children }) {
  return (
    <div className="bg-[#13151b] flex flex-col justify-between min-w-screen min-h-screen relative">
        <img src={Wave} className="absolute w-full h-full bottom-0" alt="blob" />
        <div className="relative z-10 flex-grow flex items-center justify-center">{children}</div>
    </div>
  );
}

export default Layout;
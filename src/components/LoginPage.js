import React from 'react';

const LoginPage = () => {
  return (
    <div className='h-screen w-screen bg-custom-bg'>
        <div className='flex flex-col max-xl:'>
            <h1>Login</h1>
            <input type='text' placeholder='Username' />
            <input type='password' placeholder='Password' />
            <button>Login</button>
        </div>
    </div>
  );
};

export default LoginPage;

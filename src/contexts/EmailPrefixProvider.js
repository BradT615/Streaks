import React, { useState } from 'react';
import { EmailPrefixContext } from './EmailPrefixContext';

export const EmailPrefixProvider = ({ children }) => {
  const [emailPrefix, setEmailPrefix] = useState('');

  return (
    <EmailPrefixContext.Provider value={{ emailPrefix, setEmailPrefix }}>
      {children}
    </EmailPrefixContext.Provider>
  );
};
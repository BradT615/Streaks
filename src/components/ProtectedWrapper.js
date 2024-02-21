// ProtectedWrapper.js
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function ProtectedWrapper({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (user === undefined) {
    return null;
  }

  return children;
}

export default ProtectedWrapper;
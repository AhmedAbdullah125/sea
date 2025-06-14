import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../context/UserContext';
export default function ProtectedRoute({ children }) {
  const { token } = useContext(userContext);
  if (token) {
    return children;
  }
  else {
    return <Navigate to='/' />
  }
}
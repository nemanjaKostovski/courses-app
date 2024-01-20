import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../../hooks';
const PrivateRoutes = () => {
  const userRole = useAppSelector((state) => state.user.user.role);
  return userRole == 'admin' ? <Outlet /> : <Navigate to='/courses' />;
};

export default PrivateRoutes;

// src/routes/Routes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../views/Layout/Layout';
import Home from '../views/Components/Home/Home';
import Book from '../views/Components/Book/Book';
import Contact from '../views/Components/Contact/Contact';
import Manage from '../views/Components/Manage/Manage';
import Confirm from '../views/Components/Confirm/Confirm';
import LoginSingup from '../views/Components/Login/Login/LoginAndSignup';
import ForgotPW from '../views/Components/Login/ForgotPassword/ForgotPassword';
import ResetPW from '../views/Components/Login/ResetPassword/ResetPassword';
import TicketManage from '../views/Components/Admin/TicketManage/TicketManage';
import BusManage from '../views/Components/Admin/BusManage/BusManage';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ requiredPermission, children }) => {
  const { user } = useAuth();

  if (user && user.permission === requiredPermission) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

const AppRoutes = ({ busRoutes, setBusRoutes, routes }) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home busRoutes={busRoutes} />} />
        <Route path="/book" element={<Book busRoutes={busRoutes} setBusRoutes={setBusRoutes} routes={routes} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/manage" element={<Manage busRoutes={busRoutes} setBusRoutes={setBusRoutes}/>} />
        <Route path='/confirm' element={<Confirm busRoutes={busRoutes} setBusRoutes={setBusRoutes} />} />       
      </Route> 
        <Route path="/login" element={<LoginSingup />} />
        <Route path="/forgot-password" element={<ForgotPW />} />
        <Route path="/reset-password" element={<ResetPW />} />      
        <Route
            path="/ticket-manage"
            element={
                <ProtectedRoute requiredPermission={0}>
                    <TicketManage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/bus-manage"
            element={
                <ProtectedRoute requiredPermission={1}>
                    <BusManage />
                </ProtectedRoute>
            }
        />
    </Routes>
  );
};

export default AppRoutes;

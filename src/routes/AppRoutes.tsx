import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EmployeeProvider } from '../context/EmployeeContext';
import { SurveyProvider } from '../context/SurveyContext';

import LoginPage from '../pages/LoginPage';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';

// Admin pages
import EmployeeListPage from '../pages/admin/EmployeeListPage';
import EmployeeDetailPage from '../pages/admin/EmployeeDetailPage';
import DashboardPage from '../pages/admin/DashboardPage';

// User pages
import UserProfilePage from '../pages/user/UserProfilePage';
import SurveyListPage from '../pages/user/SurveyListPage';
import SurveyDetailPage from '../pages/user/SurveyDetailPage';

// Protected route components
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const UserRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'user') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <EmployeeProvider>
      <SurveyProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Redirect based on user role */}
          <Route path="/" element={
            user ? (
              user.role === 'admin' ? 
                <Navigate to="/admin/employees" replace /> : 
                <Navigate to="/user/profile" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route path="employees" element={<EmployeeListPage />} />
            <Route path="employees/:id" element={<EmployeeDetailPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route index element={<Navigate to="/admin/employees" replace />} />
          </Route>
          
          {/* User routes */}
          <Route path="/user" element={
            <UserRoute>
              <UserLayout />
            </UserRoute>
          }>
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="surveys" element={<SurveyListPage />} />
            <Route path="surveys/:id" element={<SurveyDetailPage />} />
            <Route index element={<Navigate to="/user/profile" replace />} />
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SurveyProvider>
    </EmployeeProvider>
  );
}
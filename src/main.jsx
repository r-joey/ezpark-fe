import { createRoot } from 'react-dom/client';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'sonner';

import UserLayout from './pages/user/UserLayout.jsx';
import HomePage from './pages/user/HomePage.jsx';
import ReservationPage from './pages/user/ReservationPage.jsx';
import AccountPage from './pages/user/AccountPage.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import LocationsPage from './pages/admin/LocationsPage.jsx';
import SlotsPage from './pages/admin/SlotsPage.jsx';
import UsersPage from './pages/admin/UsersPage.jsx';
import AdminReservationsPage from './pages/admin/AdminReservationsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AuthLayout from './pages/AuthLayout.jsx';
import UnAuthorized from './pages/UnAuthorized.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <Toaster richColors position="top-center" />
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
        </Route>

        <Route element={<ProtectedRoutes requiredRole="user" />}>
          <Route element={<UserLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes requiredRole="admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="admin/locations" element={<LocationsPage />} />
            <Route path="admin/reservations" element={<AdminReservationsPage />} />
            <Route path="admin/slots" element={<SlotsPage />} />
            <Route path="admin/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

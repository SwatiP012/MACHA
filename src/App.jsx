import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage'; // <-- Import your booking page
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AdminProfile from './pages/admin/AdminProfile';
import AdminSecurity from './pages/admin/AdminSecurity';
import AppLayout from './components/AppLayout';
import BookingsManagement from './pages/admin/BookingsManagement';
import UsersManagement from './pages/admin/UsersManagement';
import OrdersManagement from './pages/admin/OrdersManagement';
import MessagesManagement from './pages/admin/MessagesManagement';
import BookingsPage from './pages/BookingsPage'; // Import the enhanced bookings page
import BookingDetailPage from './pages/BookingDetailPage'; // Import the booking detail page
import AdminAnalytics from './pages/admin/AdminAnalytics';

// A component to handle auth redirects
const AuthRedirect = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is already logged in, redirect based on role
  if (currentUser) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/'} replace />;
  }

  // Otherwise, continue to auth page
  return <AuthPage />;
};

// User route that requires authentication and user role
const UserRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Admin trying to access user route
  if (currentUser.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// Admin route that requires authentication and admin role
const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // User without admin role
  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
      <Route path="/login" element={<AuthRedirect />} />
      <Route path="/signup" element={<AuthRedirect />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* User Routes */}
      <Route path="/profile" element={
        <UserRoute>
          <AppLayout>
            <ProfilePage />
          </AppLayout>
        </UserRoute>
      } />

      {/* Book Now Route */}
      <Route path="/book" element={
        <UserRoute>
          <AppLayout>
            <BookingPage />
          </AppLayout>
        </UserRoute>
      } />

      {/* Enhanced User Bookings Route */}
      <Route path="/bookings" element={
        <UserRoute>
          <AppLayout>
            <BookingsPage />
          </AppLayout>
        </UserRoute>
      } />

      {/* Add Single Booking Details Route */}
      <Route path="/bookings/:bookingId" element={
        <UserRoute>
          <AppLayout>
            <BookingDetailPage />
          </AppLayout>
        </UserRoute>
      } />

      {/* Admin Routes - Properly nested with index route */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }>
        {/* Index route - This will render when path is exactly "/admin" */}
        <Route index element={<AdminHome />} />

        {/* Nested routes */}
        <Route path="profile" element={<AdminProfile />} />
        <Route path="security" element={<AdminSecurity />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="bookings" element={<BookingsManagement />} />
        <Route path="messages" element={<MessagesManagement />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<div>Admin Settings</div>} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
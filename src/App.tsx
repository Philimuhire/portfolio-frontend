import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider, ToastViewport } from "@/components/Toast";
import { Toaster } from "@/components/Toaster";
import { useAuth } from './contexts/AuthContext';
import Navigation from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Skills from './pages/Skills';
import AdminPage from './pages/Admin';
import LoginPage from './pages/LoginPage';
import SingleBlog from './pages/SingleBlog';
import SingleProject from './pages/SingleProject';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const location = useLocation();

  // Hide navbar and footer on admin and login pages
  const hideLayout = location.pathname === '/admin' || location.pathname === '/login';

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <Toaster />
      {!hideLayout && <Navigation onLogout={logout} token={isAuthenticated ? "authenticated" : null} />}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<SingleProject />} />
        <Route path="/services" element={<Services />} />
        <Route path="/skills" element={<Skills />} />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/admin" replace /> : <LoginPage />}
        />

        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideLayout && <Footer />}
      <ToastViewport />
    </ToastProvider>
  );
}

export default App;

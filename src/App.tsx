import { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider, ToastViewport } from "@/components/Toast";
import { Toaster } from "@/components/Toaster";
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
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); 
  };

  return (
    <ToastProvider>
      <Toaster />
      <Navigation onLogout={handleLogout} token={token} />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/skills" element={<Skills />} />

        <Route
          path="/login"
          element={token ? <Navigate to="/admin" replace /> : <LoginPage setToken={setToken} />}
        />

        <Route
          path="/admin"
          element={token ? <AdminPage /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <ToastViewport />
    </ToastProvider>
  );
}

export default App;

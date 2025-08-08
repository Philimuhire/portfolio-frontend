// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { ToastProvider, ToastViewport } from "@/components/Toast";
import { Toaster } from "@/components/Toaster";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Skills from './pages/Skills';

function App() {
  return (
    <>
     <ToastProvider>
      <Toaster />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
      <Footer/>
      <ToastViewport />
      </ToastProvider>
    </>
  );
}

export default App;

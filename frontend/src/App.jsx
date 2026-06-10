import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import About from './components/About';
import Menu from './components/Menu'; 
import CartDrawer from './components/CartDrawer'; 
import Checkout from './components/Checkout'; 
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Footer from './components/Footer';
import HistoryHours from './components/HistoryHours';

const Home = () => {
  return (
    <div className="fade-in-component">
      <Hero />
      <Categories />
      <About />
      <Menu />
      <HistoryHours />
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div style={{ display: 'block', width: '100%', minHeight: '100vh', backgroundColor: '#fff8f0', position: 'relative' }}>
        
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* FIXED: Changed main tag background to match theme */}
        <main style={{ display: 'block', width: '100%', paddingTop: '75px', backgroundColor: '#fff8f0' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} /> 
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
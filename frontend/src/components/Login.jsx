import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // SWAPPED: Hardcoded fetch replaced with environment-variable-backed Axios instance
      const response = await API.post('/api/auth/login', { username, password });

      // Axios data contains your payload directly if the server responds with a 2xx status code
      const data = response.data;

      if (data && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', data.username);
        navigate('/admin');
      } else {
        setError(data.message || 'Access Denied. Invalid credentials.');
      }
    } catch (err) {
      // Axios handles non-2xx status codes (like 400 or 401) by throwing an error block.
      // We read the server message safely here, fallback on connection loss.
      const serverMessage = err.response?.data?.message;
      setError(serverMessage || 'Connection failure with the authorization server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '75vh', background: 'var(--light)' }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%', 
        background: '#fff', 
        borderRadius: '18px',
        boxShadow: 'var(--shadow-lg)',
        padding: '40px'
      }}>
        <div className="text-center mb-4">
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), #c01e12)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 8px 20px rgba(232, 40, 26, 0.3)'
          }}>
            <i className="fas fa-lock fs-3" style={{ color: '#fff' }}></i>
          </div>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontWeight: 900, 
            color: 'var(--dark)',
            marginBottom: '8px',
            fontSize: '1.75rem'
          }}>Staff Gateway</h3>
          <p style={{ color: '#888', fontSize: '0.85rem', fontFamily: "'Poppins', sans-serif" }}>Please verify credentials to access administrative views.</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220, 53, 69, 0.1)',
            color: '#dc3545',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Username</label>
            <input 
              type="text" 
              className="form-control" 
              style={{ 
                padding: '12px 16px', 
                borderRadius: '12px', 
                border: '1px solid #e0e0e0',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.3s ease'
              }}
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Password</label>
            <input 
              type="password" 
              className="form-control" 
              style={{ 
                padding: '12px 16px', 
                borderRadius: '12px', 
                border: '1px solid #e0e0e0',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.3s ease'
              }}
              placeholder="••••••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn w-100 py-3 fw-bold"
            style={{
              background: 'linear-gradient(135deg, var(--primary), #c01e12)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '0.95rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif"
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(232, 40, 26, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" style={{ color: '#fff' }} role="status"></span>
                Authenticating Gateway...
              </>
            ) : (
              'Secure Authorization Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
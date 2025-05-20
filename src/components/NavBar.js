// client/src/components/NavBar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          Observatório da Mulher
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>
                <i className="bi bi-house-door me-1"></i>
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/form" onClick={closeMenu}>
                <i className="bi bi-clipboard-check me-1"></i>
                Formulário
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" onClick={closeMenu}>
                  <i className="bi bi-bar-chart me-1"></i>
                  Observatório da Mulher
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                <i className="bi bi-info-circle me-1"></i>
                Sobre Nós
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item">
                <button 
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }} 
                  className="nav-link btn btn-link"
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={closeMenu}>
                  <i className="bi bi-person-circle me-1"></i>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
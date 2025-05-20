// client/src/components/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          VioletaInsight
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door me-1"></i>
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/form">
                <i className="bi bi-clipboard-check me-1"></i>
                Formulário
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="bi bi-bar-chart me-1"></i>
                  Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <i className="bi bi-info-circle me-1"></i>
                Sobre Nós
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn btn-link">
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
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
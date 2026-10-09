import { useEffect, useRef, useContext, useState, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
import * as api from './api/api.js';

// Central Data Source
import { portfolioData } from './data/portfolioData.js';

import PageLoader from './components/PageLoader.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { lazyWithMinDelay } from './utils/lazyWithMinDelay.js';

import Home from './pages/Home.jsx';
const Contact = lazyWithMinDelay(() => import('./pages/Contact.jsx'));
const Login = lazyWithMinDelay(() => import('./pages/Login.jsx'));
const Register = lazyWithMinDelay(() => import('./pages/Register.jsx'));
const ProjectsPage = lazyWithMinDelay(() => import('./pages/ProjectsPage.jsx'));
const NotFound = lazyWithMinDelay(() => import('./pages/NotFound.jsx'));

function Shell() {
  const location = useLocation();
  const path = location.pathname;
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [toasts, setToasts] = useState([]);

  // Extract from data file
  const { profile, theme, contact } = portfolioData;

  useEffect(() => {
    document.title = path === '/' ? `${profile.name} — Portfolio` : `Renish Patel — Portfolio`;
  }, [path, profile.name]);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const main = document.getElementById('main-content');
    if (main) main.focus({ preventScroll: true });
  }, [path]);

  useEffect(() => {
    api.setUnauthorizedCallback(() => {
      logout();
      setToasts([{ id: Date.now(), message: 'Session expired, please log in again', type: 'error' }]);
      navigate('/login');
    });
  }, [logout, navigate]);

  return (
    <div className="app" style={{ '--theme-color': theme.accentColor }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <NavBar displayName={profile.displayName} />
      
      {path === '/' ? <Header profile={profile} /> : null}
      
      <main id="main-content" tabIndex={-1} className="page-transition" key={path}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home data={portfolioData} />} />
              <Route path="/contact" element={<Contact contactData={contact} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <ProjectsPage projects={portfolioData.projects} />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      
      <Footer name={profile.name} />
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

export default App;

import { useEffect, useRef, useContext, useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import { skillList } from './data/portfolio.js';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
import * as api from './api/api.js';

import PageLoader from './components/PageLoader.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { lazyWithMinDelay } from './utils/lazyWithMinDelay.js';

// EAGER IMPORTS (Landing page loads immediately)
import Home from './pages/Home.jsx';

// LAZY IMPORTS (Route-level code splitting)
const Contact = lazyWithMinDelay(() => import('./pages/Contact.jsx'));
const Login = lazyWithMinDelay(() => import('./pages/Login.jsx'));
const Register = lazyWithMinDelay(() => import('./pages/Register.jsx'));
const ProjectsPage = lazyWithMinDelay(() => import('./pages/ProjectsPage.jsx'));
const NotFound = lazyWithMinDelay(() => import('./pages/NotFound.jsx'));

const PAGE_TITLES = {
  '/': 'Student Portfolio — Alex Carter',
  '/projects': 'Tasks — Student Portfolio',
  '/contact': 'Contact — Student Portfolio',
  '/login': 'Login — Student Portfolio',
  '/register': 'Register — Student Portfolio',
};

function Shell({ name, themeColor }) {
  const location = useLocation();
  const path = location.pathname;
  const isFirstRender = useRef(true);
  
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.title = PAGE_TITLES[path] ?? 'Page not found — Student Portfolio';
  }, [path]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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
    <div className="app" style={{ '--theme-color': themeColor }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <NavBar theme={themeColor} toggleTheme={() => {}} />
      {path === '/' ? <Header name={name} /> : null}
      
      <main id="main-content" tabIndex={-1} className="page-transition" key={path}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home skillList={skillList} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      
      <Footer />
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  );
}

function App({ name, themeColor }) {
  return (
    <AuthProvider>
      <Shell name={name} themeColor={themeColor} />
    </AuthProvider>
  );
}

App.propTypes = { name: PropTypes.string.isRequired, themeColor: PropTypes.string.isRequired };
Shell.propTypes = { name: PropTypes.string.isRequired, themeColor: PropTypes.string.isRequired };

export default App;

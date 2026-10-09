import { useState, useContext } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SectionWrapper from '../components/SectionWrapper';
import './Auth.css';

export default function Register() {
  const { user, register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/projects" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await register(email, password);
      navigate('/projects');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="register" title="Register" titleTag="h1">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" disabled={loading} />
        </div>
        <div className="auth-form__group">
          <label htmlFor="password">Password (8+ chars)</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" disabled={loading} />
        </div>
        {error && <p className="auth-form__error" aria-live="assertive">{error}</p>}
        <button type="submit" className="button button--primary" disabled={loading || password.length < 8}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="auth-form__link">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </SectionWrapper>
  );
}

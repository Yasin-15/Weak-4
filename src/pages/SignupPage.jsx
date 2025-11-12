import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
      // Redirect to products page after successful signup
      navigate('/products', { replace: true });
    } catch (err) {
      setErrors({ general: err.message || 'Failed to sign up' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Sign Up</h1>
          <p className="auth-subtitle">Create your Hami MiniMarket account</p>

          {errors.general && (
            <div className="auth-error" role="alert">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="John Doe"
                required
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                disabled={isLoading}
              />
              {errors.name && (
                <span id="name-error" className="form-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="you@example.com"
                required
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={isLoading}
              />
              {errors.email && (
                <span id="email-error" className="form-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="At least 6 characters"
                required
                aria-required="true"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
                disabled={isLoading}
              />
              {errors.password && (
                <span id="password-error" className="form-error" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Re-enter your password"
                required
                aria-required="true"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span id="confirmPassword-error" className="form-error" role="alert">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
              aria-label={isLoading ? 'Creating account...' : 'Create your account'}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

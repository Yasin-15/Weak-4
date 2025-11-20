import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));

      // Validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Get stored users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user by email
      const foundUser = storedUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Check password (in real app, this would be hashed)
      if (foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Create user data (without password)
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));

      // Validation
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Get stored users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (storedUsers.find(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
      };

      // Add to stored users
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      // Create user data (without password)
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

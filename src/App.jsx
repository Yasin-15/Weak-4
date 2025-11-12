import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route
                    path="/order-history"
                    element={
                      <ProtectedRoute>
                        <OrderHistory />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

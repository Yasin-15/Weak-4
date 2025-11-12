import { createContext, useContext, useState, useEffect } from 'react';
import { saveCart, loadCart, clearCart as clearCartStorage } from '../utils/storage';
import { useToast } from './ToastContext';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [cartAnnouncement, setCartAnnouncement] = useState('');
    const { showToast } = useToast();

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = loadCart();
        if (savedCart.length > 0) {
            setItems(savedCart);
        }
    }, []);

    // Sync cart to localStorage whenever items change
    useEffect(() => {
        saveCart(items);
    }, [items]);

    /**
     * Add item to cart or update quantity if already exists
     * @param {Object} product - Product to add
     * @param {number} quantity - Quantity to add (default: 1)
     */
    const addItem = (product, quantity = 1) => {
        setItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.product.id === product.id
            );

            if (existingItemIndex > -1) {
                // Product already in cart, update quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                const message = `${product.name} quantity updated in cart`;
                setCartAnnouncement(message);
                showToast(message, 'success');
                return updatedItems;
            } else {
                // New product, add to cart
                const message = `${product.name} added to cart`;
                setCartAnnouncement(message);
                showToast(message, 'success');
                return [...prevItems, { product, quantity }];
            }
        });
    };

    /**
     * Update quantity of a cart item
     * @param {string} productId - ID of the product
     * @param {number} quantity - New quantity
     */
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    /**
     * Remove item from cart
     * @param {string} productId - ID of the product to remove
     */
    const removeItem = (productId) => {
        setItems(prevItems => {
            const itemToRemove = prevItems.find(item => item.product.id === productId);
            if (itemToRemove) {
                const message = `${itemToRemove.product.name} removed from cart`;
                setCartAnnouncement(message);
                showToast(message, 'info');
            }
            return prevItems.filter(item => item.product.id !== productId);
        });
    };

    /**
     * Clear all items from cart
     */
    const clearCart = () => {
        setItems([]);
        clearCartStorage();
        setCartAnnouncement('Cart cleared');
    };

    /**
     * Get total number of items in cart
     * @returns {number} Total item count
     */
    const getItemCount = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    /**
     * Calculate subtotal of all items in cart
     * @returns {number} Subtotal amount
     */
    const getSubtotal = () => {
        return items.reduce(
            (total, item) => total + (item.product.price * item.quantity),
            0
        );
    };

    const value = {
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getItemCount,
        getSubtotal
    };

    return (
        <CartContext.Provider value={value}>
            {/* ARIA live region for cart updates */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {cartAnnouncement}
            </div>
            {children}
        </CartContext.Provider>
    );
};

/**
 * Custom hook to use cart context
 * @returns {Object} Cart context value
 */
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;

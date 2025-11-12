import { createContext, useContext, useState } from 'react';
import Toast from '../components/common/Toast';

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        message: '',
        type: 'success',
        isVisible: false,
    });

    const showToast = (message, type = 'success', duration = 3000) => {
        setToast({
            message,
            type,
            isVisible: true,
            duration,
        });
    };

    const hideToast = () => {
        setToast((prev) => ({ ...prev, isVisible: false }));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
                duration={toast.duration}
            />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default ToastContext;

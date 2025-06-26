import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as groceryService from '../services/groceryService';

const GroceryContext = createContext();

export const GroceryProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem('groceryCart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            } catch (e) {
                console.error('Error parsing cart from localStorage:', e);
            }
        }

        // Fetch initial data
        fetchInitialData();
    }, []);

    // Save cart to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('groceryCart', JSON.stringify(cart));
    }, [cart]);

    // Fetch initial data (categories and featured products)
    const fetchInitialData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch categories
            const categoriesData = await groceryService.getCategories();
            setCategories(categoriesData);

            // Fetch featured products
            const { products } = await groceryService.getProducts({ featured: true, limit: 8 });
            setFeaturedProducts(products);

            setLoading(false);
        } catch (err) {
            setError('Failed to fetch grocery data. Please try again later.');
            console.error('Error in fetchInitialData:', err);
            setLoading(false);
        }
    };

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            // Check if product already exists in cart
            const existingItemIndex = prevCart.findIndex(item => item.id === product._id);

            if (existingItemIndex >= 0) {
                // Update quantity if product exists
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            } else {
                // Add new item to cart
                return [...prevCart, {
                    id: product._id,
                    name: product.name,
                    image: product.images?.[0] || '',
                    price: product.salePrice || product.price,
                    quantity
                }];
            }
        });
    };

    // Update item quantity
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    // Calculate cart totals
    const getCartTotal = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = cart.length > 0 ? 40 : 0;
        const taxes = subtotal * 0.05; // 5% tax
        const total = subtotal + deliveryFee + taxes;

        return {
            subtotal: parseFloat(subtotal.toFixed(2)),
            deliveryFee: parseFloat(deliveryFee.toFixed(2)),
            taxes: parseFloat(taxes.toFixed(2)),
            total: parseFloat(total.toFixed(2))
        };
    };

    // Place order
    const placeOrder = async (orderData) => {
        try {
            // Transform cart items to the format expected by the API
            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }));

            const totals = getCartTotal();

            // Create order object with the necessary data
            const orderPayload = {
                items,
                deliveryAddress: orderData.deliveryAddress,
                paymentMethod: orderData.paymentMethod,
                deliveryNotes: orderData.deliveryNotes,
                subtotal: totals.subtotal,
                deliveryFee: totals.deliveryFee,
                discount: 0, // Add discount logic if needed
                total: totals.total
            };

            // Place the order
            const result = await groceryService.placeOrder(orderPayload);

            // Clear cart after successful order
            clearCart();
            return result;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    };

    // Context value
    const contextValue = {
        cart,
        categories,
        featuredProducts,
        loading,
        error,
        isCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        placeOrder,
        setIsCartOpen,
        fetchInitialData
    };

    return (
        <GroceryContext.Provider value={contextValue}>
            {children}
        </GroceryContext.Provider>
    );
};

// Custom hook for using the context
export const useGrocery = () => {
    const context = useContext(GroceryContext);
    if (!context) {
        throw new Error('useGrocery must be used within a GroceryProvider');
    }
    return context;
};

export default GroceryContext;

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Add this import

// Base API URL - Falls back to localhost if env var not set
const API_BASE_URL = import.meta.env.VITE_API_URL;
//const API_URL = import.meta.env.VITE_API_URL;

// Sample restaurant data for development/fallback

/**
 * Fetches restaurant data from the API or falls back to sample data
 * @param {Object} options - Filter options like category, location
 * @returns {Promise<Array>} - Array of restaurant objects
 */
export const getRestaurants = async (options = {}) => {
    try {
        // Try to fetch from API first
        const response = await axios.get(`${API_BASE_URL}/restaurants`, {
            params: options,
            timeout: 5000 // 5 second timeout
        });
        return response.data.restaurants;
    } catch (error) {
        console.log('Using fallback restaurant data');
        // Return sample data as fallback
        return SAMPLE_RESTAURANTS;
    }
};

/**
 * Fetches popular restaurant data
 * @returns {Promise<Array>} - Array of popular restaurant objects
 */
export const getPopularRestaurants = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/food-delivery/restaurants/popular`);
        return response.data.restaurants;
    } catch (error) {
        // Return top-rated sample restaurants as fallback
        return SAMPLE_RESTAURANTS.filter(restaurant => restaurant.rating >= 4.3);
    }
};

/**
 * Gets restaurant details by ID
 * @param {string} id - Restaurant ID
 * @returns {Promise<Object>} - Restaurant object
 */
export const getRestaurantById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/food-delivery/restaurants/${id}`);
        return response.data.restaurant;
    } catch (error) {
        // Return matching sample restaurant as fallback
        const restaurant = SAMPLE_RESTAURANTS.find(r => r.id === id);
        if (!restaurant) {
            throw new Error('Restaurant not found');
        }
        return restaurant;
    }
};

/**
 * Places a food order
 * @param {Object} orderData - Order details including items, address, payment
 * @returns {Promise<Object>} - Order confirmation details
 */
export const placeOrder = async (orderData) => {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        console.log('Placing order with data:', orderData); // Add this line


        const response = await axios.post(
            `${API_BASE_URL}/food-delivery/orders`,
            orderData,
            { headers }
        );

        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        // For demo purposes, return a mock successful order
        return {
            success: true,
            orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
            estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
            message: "Order placed successfully! This is a demo order."
        };
    }
};

/**
 * Gets user's order history
 * @param {Object} options - Pagination and filter options
 * @returns {Promise<Array>} - Array of order objects
 */
export const getOrderHistory = async (options = {}) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        const response = await axios.get(`${API_BASE_URL}/food-delivery/orders/history`, {
            headers: { Authorization: `Bearer ${token}` },
            params: options
        });

        return response.data.orders;
    } catch (error) {
        console.error('Error fetching order history:', error);
        // Return empty array as fallback
        return [];
    }
};

/**
 * Gets a specific order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} - Order details
 */
export const getOrderById = async (orderId) => {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
            `${API_BASE_URL}/food-delivery/orders/${orderId}`,
            { headers }
        );

        return response.data.order;
    } catch (error) {
        console.error('Error fetching order:', error);
        // Return mock order data
        return {
            id: orderId,
            status: 'processing',
            items: [],
            total: 0,
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString()
        };
    }
};

/**
 * Cancels an order
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} - Cancellation confirmation
 */
export const cancelOrder = async (orderId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        const response = await axios.post(
            `${API_BASE_URL}/food-delivery/orders/${orderId}/cancel`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data;
    } catch (error) {
        console.error('Error cancelling order:', error);
        throw new Error('Failed to cancel order');
    }
};

/**
 * Gets saved user addresses
 * @returns {Promise<Array>} - Array of address objects
 */
export const getSavedAddresses = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return [];

        const response = await axios.get(
            `${API_BASE_URL}/users/addresses`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data.addresses;
    } catch (error) {
        console.error('Error fetching addresses:', error);
        return [];
    }
};

/**
 * Saves a new delivery address
 * @param {Object} addressData - Address details
 * @returns {Promise<Object>} - Saved address
 */
export const saveAddress = async (addressData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        const response = await axios.post(
            `${API_BASE_URL}/users/addresses`,
            addressData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data.address;
    } catch (error) {
        console.error('Error saving address:', error);
        throw new Error('Failed to save address');
    }
};

/**
 * Gets all orders for the current user
 * @returns {Promise<Array>} - Array of order objects
 */
export const getUserOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');
        const response = await axios.get(
            `${API_BASE_URL}/food-delivery/orders`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data.orders;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return [];
    }
};


// Export additional utility functions
export default {
    getRestaurants,
    getPopularRestaurants,
    getRestaurantById,
    placeOrder,
    getOrderHistory,
    getOrderById,
    cancelOrder,
    getSavedAddresses,
    saveAddress,
    getUserOrders
};

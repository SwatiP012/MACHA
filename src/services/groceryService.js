import axios from 'axios';

// Base API URL - Falls back to localhost if env var not set
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const GROCERY_API = `${API_BASE_URL}/grocery`;

// Helper function to get auth token
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// PUBLIC ENDPOINTS

// Get all products
export const getProducts = async (params = {}) => {
    try {
        const response = await axios.get(`${GROCERY_API}/products`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get a single product
export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${GROCERY_API}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};

// Get all categories
export const getCategories = async (params = {}) => {
    try {
        const response = await axios.get(`${GROCERY_API}/categories`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Get a single category with its products
export const getCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${GROCERY_API}/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category details:', error);
        throw error;
    }
};

// USER ENDPOINTS (require authentication)

// Place a new order
export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${GROCERY_API}/orders`, orderData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

// Get user's orders
export const getUserOrders = async (params = {}) => {
    try {
        const response = await axios.get(`${GROCERY_API}/user/orders`, {
            params,
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};

// Get order details
export const getOrderDetails = async (orderId) => {
    try {
        const response = await axios.get(`${GROCERY_API}/orders/${orderId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

// ADMIN ENDPOINTS

// Get all products (admin)
export const getAdminProducts = async (params = {}) => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/products`, {
            params,
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching admin products:', error);
        throw error;
    }
};

// Create a new product
export const createProduct = async (productData) => {
    try {
        // Transform the form data to match what the API expects
        const formattedData = {
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price) || 0,
            salePrice: productData.salePrice ? parseFloat(productData.salePrice) : undefined,
            costPrice: productData.cost ? parseFloat(productData.cost) : undefined,
            // Pass category name instead of trying to use the ID directly
            category: productData.categoryId, // Changed from categoryId to category
            stock: productData.stockQuantity ? parseInt(productData.stockQuantity) : 0,
            minStockLevel: productData.stockAlert ? parseInt(productData.stockAlert) : 0,
            sku: productData.sku || '',
            weight: productData.weight ? parseFloat(productData.weight) : undefined,
            images: productData.images || [],
            isActive: productData.isActive || true,
            isFeatured: productData.featured || false
        };

        console.log('Sending product data:', formattedData);

        const response = await axios.post(`${GROCERY_API}/admin/products`, formattedData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Update a product
export const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`${GROCERY_API}/admin/products/${productId}`, productData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${GROCERY_API}/admin/products/${productId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Create a new category
export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${GROCERY_API}/admin/categories`, categoryData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Update a category
export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await axios.put(`${GROCERY_API}/admin/categories/${categoryId}`, categoryData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${GROCERY_API}/admin/categories/${categoryId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

// Get all orders (admin)
export const getAdminOrders = async (params = {}) => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/orders`, {
            params,
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching admin orders:', error);
        throw error;
    }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.patch(
            `${GROCERY_API}/admin/orders/${orderId}/status`,
            { status },
            { headers: getAuthHeader() }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

// Inventory management
export const adjustInventory = async (adjustmentData) => {
    try {
        const response = await axios.post(
            `${GROCERY_API}/admin/inventory/adjust`,
            adjustmentData,
            { headers: getAuthHeader() }
        );
        return response.data;
    } catch (error) {
        console.error('Error adjusting inventory:', error);
        throw error;
    }
};

// Get inventory summary
export const getInventorySummary = async () => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/inventory/summary`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory summary:', error);
        throw error;
    }
};

// Get inventory adjustment history
export const getInventoryHistory = async (params = {}) => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/inventory/history`, {
            params,
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory history:', error);
        throw error;
    }
};

// Export inventory (CSV)
export const exportInventory = async () => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/inventory/export`, {
            headers: getAuthHeader(),
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('Error exporting inventory:', error);
        throw error;
    }
};

// Analytics
export const getSalesAnalytics = async (period = '7days') => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/analytics/sales`, {
            params: { period },
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales analytics:', error);
        throw error;
    }
};

export const getTopProducts = async (limit = 10) => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/analytics/top-products`, {
            params: { limit },
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top products:', error);
        throw error;
    }
};

export const getSalesByCategory = async () => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/analytics/sales-by-category`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales by category:', error);
        throw error;
    }
};

// Get order statistics
export const getOrderStats = async () => {
    try {
        const response = await axios.get(`${GROCERY_API}/admin/orders/stats`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order statistics:', error);
        throw error;
    }
};


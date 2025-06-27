import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GroceryNavBar from '../../../components/grocery/GroceryNavBar';
import ProductGrid from '../../../components/grocery/ProductGrid';
import CartSidebar from '../../../components/grocery/CartSidebar';

const CategoriesPage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [fetchError, setFetchError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL; // should be https://macha-3dve.onrender.com/api

    useEffect(() => {
        // Fetch categories and products from backend
        const fetchData = async () => {
            setIsLoading(true);
            setFetchError(null);
            try {
                // Fetch all categories
                const catRes = await fetch(`${API_URL}/grocery/categories`);
                if (!catRes.ok) throw new Error('Failed to fetch categories');
                const categoriesData = await catRes.json();
                setCategories(categoriesData);

                // Fetch all products
                const prodRes = await fetch(`${API_URL}/grocery/products?limit=1000`);
                if (!prodRes.ok) throw new Error('Failed to fetch products');
                const prodData = await prodRes.json();
                const allProducts = prodData.products || prodData;

                // Group products by categoryId
                const grouped = {};
                allProducts.forEach(product => {
                    const catId = product.categoryId?._id || product.categoryId;
                    if (!grouped[catId]) grouped[catId] = [];
                    grouped[catId].push(product);
                });
                setProductsByCategory(grouped);
            } catch (err) {
                setFetchError(err.message);
                setCategories([]);
                setProductsByCategory({});
                console.error('FETCH ERROR:', err);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    // Cart handlers
    const handleAddToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    useEffect(() => {
        console.log('categories:', categories);
        console.log('productsByCategory:', productsByCategory);
        console.log('isLoading:', isLoading);
        if (fetchError) {
            console.error('Fetch error:', fetchError);
        }
    }, [categories, productsByCategory, isLoading, fetchError]);

    const handleRemoveItem = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <GroceryNavBar />

            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl text-black font-bold mb-6">All Categories</h1>

                {/* Error Fallback */}
                {fetchError && (
                    <div className="text-red-600 mb-4">
                        Error: {fetchError}
                    </div>
                )}

                {/* Categories Grid */}
                <div className="text-black mb-10">
                    {isLoading ? (
                        <div className="grid text-black grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl overflow-hidden shadow h-48 animate-pulse flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-gray-200 mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            ))}
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-gray-500">No categories found.</div>
                    ) : (
                        <div className="text-black grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categories.map(category => (
                                <Link
                                    key={category._id}
                                    to={`/grocery/categories/${category._id}`}
                                    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-[1.03] transition-all flex flex-col items-center p-4 group"
                                >
                                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-3 flex items-center justify-center border border-gray-200 group-hover:border-green-400 transition-all">
                                        <img
                                            src={category.image || "https://placehold.co/120x120?text=No+Image"}
                                            alt={category.name}
                                            className="object-cover w-full h-full"
                                            onError={e => { e.target.src = "https://placehold.co/120x120?text=No+Image"; }}
                                        />
                                    </div>
                                    <div className="w-full text-center">
                                        <h3 className="font-semibold text-base text-gray-900 capitalize mb-1 flex items-center justify-center gap-1">
                                            {category.icon && <span>{category.icon}</span>}
                                            {category.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {(productsByCategory[category._id]?.length || 0)} product{(productsByCategory[category._id]?.length || 0) !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Products by Category */}
                {!isLoading && categories.map(category => (
                    <section className="text-black mb-10" key={category._id}>
                        <ProductGrid
                            title={`${category.name}${category.icon ? ' ' + category.icon : ''}`}
                            products={productsByCategory[category._id] || []}
                            viewAllLink={`/grocery/categories/${category._id}`}
                            loading={isLoading}
                            cols={4}
                            onAddToCart={handleAddToCart}
                        />
                    </section>
                ))}
            </div>

            {/* Cart Sidebar */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
            />
        </div>
    );
};

console.log("CategoriesPage loaded");

export default CategoriesPage;
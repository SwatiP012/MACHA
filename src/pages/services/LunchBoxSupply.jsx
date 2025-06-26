import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    UtensilsCrossed,
    Salad,
    CheckCircle,
    Check,
    ArrowLeft,
    Calendar,
    Phone,
    Clock,
    Flame,
    Leaf
} from 'lucide-react';

const LunchBoxSupply = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate('/book');
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply pt-32">
                <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1546069901-5ec6a79120b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

                {/* Back to Services button positioned below navbar */}
                <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
                    <Link
                        to="/"
                        className="inline-flex items-center text-white hover:text-green-100 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="font-medium">Back to Services</span>
                    </Link>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center text-white"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Lunch Box Supply Service</h1>
                        <p className="text-xl md:text-2xl mb-8">Fresh, nutritious meals delivered daily to your workplace or school</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="tel:+918008330905"
                                className="px-8 py-3 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-colors"
                            >
                                <Phone className="w-5 h-5 mr-2 inline" /> Call Now
                            </a>
                            <button
                                onClick={handleBookNow}
                                className="px-8 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-colors"
                            >
                                <Calendar className="w-5 h-5 mr-2 inline" /> Subscribe Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Lunch Box Service</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Fresh & Nutritious</h3>
                            <p className="text-gray-600">
                                Our meals are prepared with fresh, high-quality ingredients sourced from local suppliers to ensure maximum nutrition and taste.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Locally sourced ingredients</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>No artificial preservatives</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Salad className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Diverse Menu Options</h3>
                            <p className="text-gray-600">
                                We offer a wide variety of menu options including vegetarian, non-vegetarian, and special dietary requirement meals.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Rotating weekly menus</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Customizable meal plans</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Clock className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Punctual Delivery</h3>
                            <p className="text-gray-600">
                                We guarantee on-time delivery to ensure you receive your meal fresh and ready to eat when you need it.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Time-slot selection</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Real-time delivery tracking</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Lunch Box Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Individual Meal Plans
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Personalized lunch boxes delivered to your workplace or home, designed to meet your nutritional needs and taste preferences.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Daily, weekly or monthly subscription</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Calorie-counted options available</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Special dietary accommodations</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Corporate Solutions
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Bulk lunch box delivery for offices and corporate events, offering convenient meal solutions for your entire team.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Simplified billing for organizations</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Custom branding opportunities</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Employee satisfaction tracking</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> School Lunch Programs
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Nutritious and kid-friendly meals delivered to schools, ensuring students have access to balanced nutrition that supports learning.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Age-appropriate portions and nutrition</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Allergy-aware meal preparation</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Parent portal for meal management</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Special Event Catering
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Boxed meal solutions for events, meetings, and gatherings, delivered on time and tailored to your event's specific requirements.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>One-time bulk orders</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Presentation-ready packaging</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Accommodations for various dietary needs</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Highlights */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Sample Menu Items</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                alt="Vegetarian Meal"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium mb-2">Vegetarian</span>
                                <h3 className="text-lg font-semibold mb-1">Garden Fresh Meal</h3>
                                <p className="text-gray-600 text-sm">Mixed vegetable curry, brown rice, garden salad and fruit</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1606851094291-6efae152bb87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                alt="Non-Vegetarian Meal"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium mb-2">Non-Vegetarian</span>
                                <h3 className="text-lg font-semibold mb-1">Protein Power</h3>
                                <p className="text-gray-600 text-sm">Grilled chicken, quinoa, steamed vegetables and yogurt</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1619889647215-6a4e384d9a9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                alt="Low-Carb Meal"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mb-2">Low-Carb</span>
                                <h3 className="text-lg font-semibold mb-1">Carb-Conscious</h3>
                                <p className="text-gray-600 text-sm">Cauliflower rice bowl with paneer, avocado and nuts</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1546069901-5ec6a79120b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                alt="International Cuisine"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium mb-2">International</span>
                                <h3 className="text-lg font-semibold mb-1">World Cuisine</h3>
                                <p className="text-gray-600 text-sm">Mediterranean mezze plate with hummus, falafel and pita</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How Our Lunch Box Service Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">1</div>
                            <h3 className="text-xl font-semibold mb-3">Subscribe</h3>
                            <p className="text-gray-600">Choose your meal plan and subscription frequency through our website or app.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">2</div>
                            <h3 className="text-xl font-semibold mb-3">Customize</h3>
                            <p className="text-gray-600">Select your meal preferences, dietary requirements, and delivery schedule.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">3</div>
                            <h3 className="text-xl font-semibold mb-3">We Prepare</h3>
                            <p className="text-gray-600">Our chefs prepare your meals fresh each day using quality ingredients.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">4</div>
                            <h3 className="text-xl font-semibold mb-3">Enjoy</h3>
                            <p className="text-gray-600">Receive your lunch box at your specified location and time, ready to eat!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Subscription Plans</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-8 bg-green-50">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Basic Plan</h3>
                                <div className="text-gray-600 mb-4">5 meals per week</div>
                                <div className="text-4xl font-bold text-gray-800">₹450<span className="text-lg font-normal text-gray-500">/week</span></div>
                                <div className="text-sm text-gray-500 mt-1">(₹90 per meal)</div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Weekday lunch delivery</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Standard vegetarian & non-veg options</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Weekly menu rotation</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-500">
                            <div className="absolute top-0 w-full text-center">
                                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                                    Most Popular
                                </div>
                            </div>
                            <div className="p-8 bg-green-50 pt-10">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Premium Plan</h3>
                                <div className="text-gray-600 mb-4">5 meals per week</div>
                                <div className="text-4xl font-bold text-gray-800">₹550<span className="text-lg font-normal text-gray-500">/week</span></div>
                                <div className="text-sm text-gray-500 mt-1">(₹110 per meal)</div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>All Basic Plan benefits</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Premium menu selections</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Customizable meal options</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Healthy snack included</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-8 bg-green-50">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Family Plan</h3>
                                <div className="text-gray-600 mb-4">15 meals per week</div>
                                <div className="text-4xl font-bold text-gray-800">₹1,200<span className="text-lg font-normal text-gray-500">/week</span></div>
                                <div className="text-sm text-gray-500 mt-1">(₹80 per meal)</div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>3 meals per day for family of 5</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Kid-friendly options</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Priority delivery slots</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Weekend delivery available</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">How are the meals packaged?</h3>
                            <p className="text-gray-600">
                                Our meals are packaged in eco-friendly, microwave-safe containers that keep your food fresh until lunchtime. Each container is properly sealed and labeled with contents and nutritional information.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Can I customize my meal plan for dietary restrictions?</h3>
                            <p className="text-gray-600">
                                Yes, we offer customization options for various dietary needs including vegetarian, vegan, gluten-free, low-carb, and allergy-sensitive meals. You can specify your requirements during subscription.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">What time will my lunch be delivered?</h3>
                            <p className="text-gray-600">
                                We offer delivery time slots between 10:00 AM and 12:30 PM to ensure your lunch arrives before your meal time. You can select your preferred time slot during checkout.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Can I pause or cancel my subscription?</h3>
                            <p className="text-gray-600">
                                Absolutely! You can pause, modify or cancel your subscription anytime through your account dashboard. We require 24-hour notice for changes to the next day's delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-green-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready for healthy, hassle-free lunches?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Join thousands of satisfied customers who enjoy our fresh lunch boxes delivered daily. Start your subscription today!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="tel:+918008330905"
                            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors flex items-center"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Call Now: +91 8008 330 905
                        </a>
                        <button
                            onClick={handleBookNow}
                            className="px-8 py-3 bg-white text-green-600 border border-green-600 font-semibold rounded-full hover:bg-green-50 transition-colors flex items-center"
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LunchBoxSupply;

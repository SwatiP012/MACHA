import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Apple,
    Heart,
    CheckCircle,
    Check,
    ArrowLeft,
    Calendar,
    Phone,
    Clock,
    Leaf,
    Truck
} from 'lucide-react';

const FruitBoxSupply = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate('/book');
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply pt-32">
                <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Fruit Box Supply Service</h1>
                        <p className="text-xl md:text-2xl mb-8">Fresh, seasonal fruits delivered to your doorstep for healthier living</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="tel:+918008330905"
                                className="px-8 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 transition-colors"
                            >
                                <Phone className="w-5 h-5 mr-2 inline" /> Call Now
                            </a>
                            <button
                                onClick={handleBookNow}
                                className="px-8 py-3 bg-green-800 text-white font-semibold rounded-full hover:bg-green-900 transition-colors"
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
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Fruit Box Service</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Apple className="w-8 h-8 text-green-700" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
                            <p className="text-gray-600">
                                We source the freshest, highest quality fruits directly from local farms and trusted suppliers to ensure maximum freshness and nutrition.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-700 mr-2" />
                                    <span>Hand-picked selection</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-700 mr-2" />
                                    <span>Farm-to-box freshness</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Heart className="w-8 h-8 text-green-700" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Health Benefits</h3>
                            <p className="text-gray-600">
                                Our curated fruit boxes provide essential vitamins, minerals, and antioxidants to support your health and well-being.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-700 mr-2" />
                                    <span>Nutrient-rich variety</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-700 mr-2" />
                                    <span>Seasonal selections</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Truck className="w-8 h-8 text-green-700" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Convenient Delivery</h3>
                            <p className="text-gray-600">
                                Regular deliveries on your schedule - no more trips to the store or carrying heavy grocery bags. Fresh fruit arrives right at your door.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-700 mr-2" />
                                    <span>Flexible delivery schedule</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-700 mr-2" />
                                    <span>Eco-friendly packaging</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Box Options Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Fruit Box Options</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-700 mr-2" /> Seasonal Selection Box
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Our most popular option featuring the best seasonal fruits available. Each week brings a varied assortment of fresh, in-season fruits.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>8-10 pieces of seasonal fruits</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>Weekly rotation of varieties</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>Perfect for individuals or couples</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-700 mr-2" /> Family Fruit Box
                            </h3>
                            <p className="text-gray-600 mb-4">
                                A larger selection of fruits designed to meet the needs of families. Contains a mix of everyday favorites and special treats.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>15-18 pieces of mixed fruits</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>Kid-friendly options included</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>Ideal for families of 3-5</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-700 mr-2" /> Exotic Fruit Box
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Experience unique and interesting fruits from around the world. A premium selection for fruit enthusiasts and adventurous eaters.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>6-8 exotic fruit varieties</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>Includes tasting notes and origin information</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>Perfect for special occasions</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-700 mr-2" /> Office Fruit Box
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Keep your team energized with a regular supply of fresh fruit. Designed for workplace kitchens and break rooms.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>25-30 pieces of easy-to-eat fruits</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>Mix of ready-to-eat and ripening fruits</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-700 mr-2 mt-1 flex-shrink-0" />
                                    <span>Suitable for teams of 5-10 people</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Fruits Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Seasonal Fruits in Our Boxes</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                                <img src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Apple" className="w-12 h-12 object-contain" />
                            </div>
                            <h3 className="font-medium">Apples</h3>
                            <p className="text-xs text-gray-500">Year-round</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                                <img src="https://images.unsplash.com/photo-1605027990121-cbae9e0642df?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Bananas" className="w-12 h-12 object-contain" />
                            </div>
                            <h3 className="font-medium">Bananas</h3>
                            <p className="text-xs text-gray-500">Year-round</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                                <img src="https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Oranges" className="w-12 h-12 object-contain" />
                            </div>
                            <h3 className="font-medium">Oranges</h3>
                            <p className="text-xs text-gray-500">Winter/Spring</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                                <img src="https://images.unsplash.com/photo-1615484477778-ca3b77940c25?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Kiwi" className="w-12 h-12 object-contain" />
                            </div>
                            <h3 className="font-medium">Kiwi</h3>
                            <p className="text-xs text-gray-500">Year-round</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                                <img src="https://images.unsplash.com/photo-1596363505729-4190a9506133?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Grapes" className="w-12 h-12 object-contain" />
                            </div>
                            <h3 className="font-medium">Grapes</h3>
                            <p className="text-xs text-gray-500">Summer/Fall</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-3">
                                <img src="https://images.unsplash.com/photo-1663227766692-f8eec41a204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Strawberries" className="w-12 h-12 object-contain" />
                            </div>
                            <h3 className="font-medium">Strawberries</h3>
                            <p className="text-xs text-gray-500">Spring/Summer</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Fruits vary based on seasonal availability. We always prioritize quality and freshness in our selections.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How Our Fruit Box Service Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">1</div>
                            <h3 className="text-xl font-semibold mb-3">Choose Your Box</h3>
                            <p className="text-gray-600">Select the box type and size that best fits your needs and preferences.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">2</div>
                            <h3 className="text-xl font-semibold mb-3">Select Frequency</h3>
                            <p className="text-gray-600">Choose weekly, bi-weekly, or monthly deliveries based on your consumption.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">3</div>
                            <h3 className="text-xl font-semibold mb-3">We Source & Pack</h3>
                            <p className="text-gray-600">Our team selects the freshest fruits and carefully packs your box.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">4</div>
                            <h3 className="text-xl font-semibold mb-3">Enjoy Fresh Fruits</h3>
                            <p className="text-gray-600">Receive your fruit box at your door and enjoy healthy snacking!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Subscription Plans</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-8 bg-green-50">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Standard Box</h3>
                                <div className="text-gray-600 mb-4">Weekly delivery</div>
                                <div className="text-4xl font-bold text-gray-800">₹399<span className="text-lg font-normal text-gray-500">/box</span></div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>8-10 pieces of seasonal fruits</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Free delivery</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Weekly fruit guide</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-600">
                            <div className="absolute top-0 w-full text-center">
                                <div className="bg-green-600 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                                    Most Popular
                                </div>
                            </div>
                            <div className="p-8 bg-green-50 pt-10">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Family Box</h3>
                                <div className="text-gray-600 mb-4">Weekly delivery</div>
                                <div className="text-4xl font-bold text-gray-800">₹599<span className="text-lg font-normal text-gray-500">/box</span></div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>15-18 pieces of mixed fruits</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Free priority delivery</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Customization options</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Weekly fruit guide & recipes</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-8 bg-green-50">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Office Box</h3>
                                <div className="text-gray-600 mb-4">Weekly delivery</div>
                                <div className="text-4xl font-bold text-gray-800">₹999<span className="text-lg font-normal text-gray-500">/box</span></div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>25-30 pieces for team sharing</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Free priority delivery</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Corporate billing available</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Display stand included</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">*Minimum 4-week subscription for all plans. You can pause or cancel anytime after the initial period.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">How fresh are the fruits?</h3>
                            <p className="text-gray-600">
                                We source our fruits directly from farms and suppliers, with most fruits arriving at our facility within 24-48 hours of harvest. We carefully select each fruit to ensure optimal ripeness and freshness when delivered to you.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Can I customize what fruits I receive?</h3>
                            <p className="text-gray-600">
                                Yes, subscribers can set fruit preferences and allergies in their account. While we can't guarantee specific fruits each week due to seasonal availability, we'll always respect your preferences and avoid fruits you don't want.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">What days do you deliver?</h3>
                            <p className="text-gray-600">
                                We deliver Monday through Saturday, and you can select your preferred delivery day during checkout. Delivery times are typically between 8am and 6pm, with specific time slots available for premium subscriptions.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">What if I'm not home for delivery?</h3>
                            <p className="text-gray-600">
                                Our fruit boxes are packaged to stay fresh for several hours after delivery. You can specify a safe place for the driver to leave your box if you're not home. We also send delivery notifications so you know when your fruit has arrived.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-green-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready for fresh, seasonal fruits?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Join our fruit box subscription service today and enjoy the convenience of fresh fruits delivered directly to your door.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="tel:+918008330905"
                            className="px-8 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-colors flex items-center"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Call Now: +91 8008 330 905
                        </a>
                        <button
                            onClick={handleBookNow}
                            className="px-8 py-3 bg-white text-green-700 border border-green-700 font-semibold rounded-full hover:bg-green-50 transition-colors flex items-center"
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

export default FruitBoxSupply;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home,
    Sparkles,
    CheckCircle,
    Check,
    ArrowLeft,
    Calendar,
    Phone,
    Clock,
    ShieldCheck,
    Users
} from 'lucide-react';

const HomeKeeping = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate('/book');
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply pt-32">
                <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Home Keeping Services</h1>
                        <p className="text-xl md:text-2xl mb-8">Maintain a clean and welcoming home with our comprehensive home keeping solutions</p>
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
                                <Calendar className="w-5 h-5 mr-2 inline" /> Book Online
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Home Keeping Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Thorough & Detailed</h3>
                            <p className="text-gray-600">
                                Our professional cleaners are trained to pay attention to every detail, ensuring a comprehensive cleaning experience.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Detailed cleaning protocols</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Quality assurance checks</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <ShieldCheck className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Safe & Eco-Friendly</h3>
                            <p className="text-gray-600">
                                We use environmentally friendly cleaning products that are safe for your family, pets, and the planet.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Non-toxic cleaning agents</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Sustainable practices</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Trusted Professionals</h3>
                            <p className="text-gray-600">
                                Our cleaning staff are carefully vetted, background-checked, and trained to deliver exceptional service.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Verified personnel</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Professional training</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Home Keeping Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Regular Cleaning
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Maintain a consistently clean home with our recurring cleaning services, scheduled at your convenience.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Dusting and surface cleaning</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Bathroom and kitchen sanitization</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Floor cleaning and vacuuming</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Deep Cleaning
                            </h3>
                            <p className="text-gray-600 mb-4">
                                A comprehensive cleaning service that reaches every corner, removing built-up dirt and grime for a truly refreshed home.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Inside appliance cleaning</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Cabinet and drawer detailing</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Baseboard and vent cleaning</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Move-In/Move-Out Cleaning
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Start fresh in your new home or leave your previous residence spotless with our specialized moving cleaning service.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Complete property cleaning</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Window and track cleaning</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Fixture and appliance detailing</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Specialized Cleaning
                            </h3>
                            <p className="text-gray-600 mb-4">
                                We offer specialized cleaning services for specific needs, including post-construction cleaning and seasonal deep cleaning.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Post-renovation cleanup</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Spring cleaning services</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Event preparation and cleanup</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How Our Home Keeping Service Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">1</div>
                            <h3 className="text-xl font-semibold mb-3">Book Your Service</h3>
                            <p className="text-gray-600">Schedule your cleaning service online or by phone, choosing the service type and preferred time.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">2</div>
                            <h3 className="text-xl font-semibold mb-3">Confirmation</h3>
                            <p className="text-gray-600">Receive booking confirmation and details about your assigned cleaning professional.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">3</div>
                            <h3 className="text-xl font-semibold mb-3">Professional Cleaning</h3>
                            <p className="text-gray-600">Our trained professionals arrive on time and clean your home according to your specifications.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">4</div>
                            <h3 className="text-xl font-semibold mb-3">Quality Check</h3>
                            <p className="text-gray-600">We conduct a final review and welcome your feedback to ensure complete satisfaction.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Pricing Plans</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-8 bg-green-50">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Standard Clean</h3>
                                <div className="text-gray-600 mb-4">Perfect for regular maintenance</div>
                                <div className="text-4xl font-bold text-gray-800">₹799<span className="text-lg font-normal text-gray-500">/visit</span></div>
                                <div className="text-sm text-gray-500 mt-1">For homes up to 1500 sq ft</div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>All living areas and bedrooms</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Kitchen and bathrooms</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Dusting and vacuuming</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Book Now
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
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Deep Clean</h3>
                                <div className="text-gray-600 mb-4">For a thorough refresh</div>
                                <div className="text-4xl font-bold text-gray-800">₹1299<span className="text-lg font-normal text-gray-500">/visit</span></div>
                                <div className="text-sm text-gray-500 mt-1">For homes up to 1500 sq ft</div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Everything in Standard Clean</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Inside cabinets and appliances</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Window interiors and baseboards</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-8 bg-green-50">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Move-In/Out</h3>
                                <div className="text-gray-600 mb-4">For a fresh start</div>
                                <div className="text-4xl font-bold text-gray-800">₹1899<span className="text-lg font-normal text-gray-500">/visit</span></div>
                                <div className="text-sm text-gray-500 mt-1">For homes up to 1500 sq ft</div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Everything in Deep Clean</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Refrigerator and oven cleaning</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Wall cleaning and fixture detailing</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-10 text-gray-500">
                        <p>Additional charges may apply for larger homes, extra services, or specific cleaning requirements.</p>
                        <p className="mt-2">Contact us for a customized quote for your specific needs.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Do I need to provide cleaning supplies?</h3>
                            <p className="text-gray-600">
                                No, our cleaning professionals bring all necessary supplies and equipment. We use high-quality, eco-friendly cleaning products. If you have specific products you'd prefer we use, please let us know in advance.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">How long does a typical cleaning take?</h3>
                            <p className="text-gray-600">
                                The duration depends on the size of your home and the type of service. A standard cleaning for a 2-bedroom home typically takes 2-3 hours, while a deep cleaning may take 4-5 hours. We'll provide a more accurate estimate when you book.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Are your cleaning staff insured?</h3>
                            <p className="text-gray-600">
                                Yes, all our cleaning professionals are fully insured. We also conduct thorough background checks on all our staff to ensure the security of your home and belongings.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Can I schedule recurring cleaning services?</h3>
                            <p className="text-gray-600">
                                Absolutely! We offer weekly, bi-weekly, and monthly recurring services at discounted rates. You can easily set up a schedule that works for you, and we'll send the same cleaning professional whenever possible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-green-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready for a cleaner, fresher home?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Book our professional home keeping services today and enjoy a spotless living environment without the hassle.
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
                            Book Online
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeKeeping;

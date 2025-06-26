import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Truck,
    Box,
    CheckCircle,
    Check,
    ArrowLeft,
    Calendar,
    Phone,
    Package,
    ShieldCheck,
    Map
} from 'lucide-react';

const PackersAndMovers = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate('/book');
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply pt-32">
                <div className="absolute inset-0 bg-opacity-70 bg-[url('https://imgs.search.brave.com/FtReJJX1_9049NRtp3muiPMwjJ4RBCfye-kDOKpM0cw/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudGhlcGFja2Vy/c21vdmVycy5jb20v/aW1hZ2VzL3BhY2tl/cnNhbmRtb3ZlcnMu/anBn')] bg-cover bg-center mix-blend-overlay"></div>

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Packers & Movers</h1>
                        <p className="text-xl md:text-2xl mb-8">Stress-free relocation services for homes and businesses with care and precision</p>
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
                                <Calendar className="w-5 h-5 mr-2 inline" /> Book Online
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Packing & Moving Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Box className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Expert Packing</h3>
                            <p className="text-gray-600">
                                Our professional packers use high-quality materials and techniques to ensure your belongings are protected during the move.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Custom packing solutions</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Special care for fragile items</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <ShieldCheck className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Safe Transportation</h3>
                            <p className="text-gray-600">
                                Our fleet of well-maintained vehicles and trained drivers ensure your possessions arrive safely at their destination.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Modern transportation fleet</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Transit insurance available</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Map className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Comprehensive Services</h3>
                            <p className="text-gray-600">
                                From packing to unpacking and arrangement, we handle every aspect of your move to make relocation seamless.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>End-to-end moving solutions</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Customizable service packages</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Moving Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Residential Moving
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Whether you're moving to a new apartment or a large family home, our residential moving services are designed to make your transition smooth and stress-free.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Apartment and house moves</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Local and long-distance relocations</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Furniture disassembly and reassembly</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Commercial Moving
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Minimize downtime with our efficient commercial moving services. We understand the importance of getting your business back up and running quickly.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Office relocations</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Equipment and inventory moves</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Weekend and after-hours moving</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Packing Services
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Let our expert packers handle the tedious task of packing your belongings. We use quality materials and proper techniques to ensure everything arrives intact.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Full and partial packing options</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Specialized packing for fragile items</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Unpacking and arrangement services</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Storage Solutions
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Need temporary storage during your move? We offer secure storage facilities for short or long-term needs to keep your belongings safe.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Climate-controlled storage units</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>24/7 security monitoring</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Flexible storage durations</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Moving Process</h2>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">1</div>
                            <h3 className="text-xl font-semibold mb-3">Consultation</h3>
                            <p className="text-gray-600">We assess your moving needs and provide a detailed quote.</p>
                        </div>

                        <div className="hidden md:block">
                            <div className="h-full flex items-center justify-center">
                                <div className="w-full h-1 bg-green-200"></div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">2</div>
                            <h3 className="text-xl font-semibold mb-3">Planning</h3>
                            <p className="text-gray-600">We create a customized moving plan tailored to your requirements.</p>
                        </div>

                        <div className="hidden md:block">
                            <div className="h-full flex items-center justify-center">
                                <div className="w-full h-1 bg-green-200"></div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">3</div>
                            <h3 className="text-xl font-semibold mb-3">Execution</h3>
                            <p className="text-gray-600">Our team handles packing, loading, transportation, and unloading.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center md:col-start-2">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">4</div>
                            <h3 className="text-xl font-semibold mb-3">Unpacking</h3>
                            <p className="text-gray-600">We help arrange your belongings in your new space as needed.</p>
                        </div>

                        <div className="hidden md:block">
                            <div className="h-full flex items-center justify-center">
                                <div className="w-full h-1 bg-green-200"></div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">5</div>
                            <h3 className="text-xl font-semibold mb-3">Final Check</h3>
                            <p className="text-gray-600">We ensure everything is completed to your satisfaction.</p>
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
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Basic Move</h3>
                                <div className="text-gray-600 mb-4">For small moves with minimal items</div>
                                <div className="text-4xl font-bold text-gray-800">₹2,999<span className="text-lg font-normal text-gray-500"> onwards</span></div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Transportation for 1BHK</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Basic packing materials</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Loading & unloading</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Get Quote
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
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Standard Move</h3>
                                <div className="text-gray-600 mb-4">Complete moving solution for 2-3BHK</div>
                                <div className="text-4xl font-bold text-gray-800">₹5,999<span className="text-lg font-normal text-gray-500"> onwards</span></div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Everything in Basic plan</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Full packing & unpacking</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Furniture disassembly & reassembly</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Basic insurance coverage</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Get Quote
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-8 bg-green-50">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Premium Move</h3>
                                <div className="text-gray-600 mb-4">Luxury moving experience</div>
                                <div className="text-4xl font-bold text-gray-800">₹9,999<span className="text-lg font-normal text-gray-500"> onwards</span></div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Everything in Standard plan</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Premium packing materials</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Specialized item handling</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Full insurance coverage</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Get Quote
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-10 text-gray-500">
                        <p>All prices are approximate and may vary based on distance, volume, and specific requirements.</p>
                        <p className="mt-2">Contact us for a personalized quote tailored to your exact moving needs.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">How far in advance should I book your moving services?</h3>
                            <p className="text-gray-600">
                                We recommend booking at least 2 weeks in advance for local moves and 3-4 weeks for long-distance moves. However, we also understand that moves can happen unexpectedly, so we do our best to accommodate last-minute bookings whenever possible.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Are my belongings insured during the move?</h3>
                            <p className="text-gray-600">
                                We offer basic insurance coverage on all moves, which covers items against damage during handling and transport. For additional peace of mind, we also offer comprehensive insurance options that provide extended coverage for high-value items.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">What items won't you move?</h3>
                            <p className="text-gray-600">
                                For safety and legal reasons, we cannot transport hazardous materials (flammables, explosives, chemicals), perishable items, plants, certain valuables (cash, jewelry), and personal/sentimental items that should remain with you. We'll provide a complete list during consultation.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">How do you handle delicate or valuable items?</h3>
                            <p className="text-gray-600">
                                We use specialized packing materials and techniques for delicate items like artwork, electronics, and antiques. Our movers are trained in proper handling procedures for valuable possessions. For extremely high-value items, we recommend discussing special arrangements during your consultation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-green-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready for a stress-free move?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Contact us today to schedule your moving service and experience a seamless relocation with our expert packers and movers.
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

export default PackersAndMovers;

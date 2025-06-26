import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Phone,
    CheckCircle,
    Check,
    Star,
    Clock,
    Shield,
    Hammer,
    Ruler,
    DoorClosed,
    Info,
    AlertCircle,
} from "lucide-react";
import machaLogo from "../../assets/macha-logo.jpg";

const Carpenter = () => {
    const navigate = useNavigate();
    const [selectedPackage, setSelectedPackage] = useState("essential");

    const handleBookNow = () => {
        navigate("/book");
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 pb-16">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[93vh] mt-3 py-24 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply">
                <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

                {/* Back to Technicians Link */}
                <div className="absolute left-0 top-0 w-full z-20 pt-10">
                    <div className="container mx-auto px-4 pt-6">
                        <Link
                            to="/services/technicians"
                            className="inline-flex items-center text-white hover:text-green-200 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            <span className="font-medium">Back to Technicians</span>
                        </Link>
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-28">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="md:w-1/2 text-white"
                        >
                            {/* MACHA Logo */}
                            <div className="mb-8">
                                <img
                                    src={machaLogo}
                                    alt="MACHA Logo"
                                    className="h-20 rounded-lg shadow-lg"
                                />
                            </div>

                            <span className="inline-block px-6 py-2 bg-white bg-opacity-20 text-white text-base font-medium rounded-full mb-6">
                                Home Services
                            </span>
                            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                                Professional Carpentry Services
                            </h1>
                            <p className="text-2xl md:text-3xl mb-10 text-green-100">
                                Skilled carpenters for all your furniture repair, customization,
                                and woodworking needs
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                <div className="flex items-center">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={20}
                                                className="text-green-300 fill-green-300"
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 font-semibold">4.8/5</span>
                                    <span className="ml-2 text-white text-opacity-80">
                                        (1.5K+ reviews)
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <Clock size={20} className="mr-2" />
                                    <span>Within 2 hours</span>
                                </div>

                                <div className="flex items-center">
                                    <Shield size={20} className="mr-2" />
                                    <span>6-month warranty</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="tel:+918008330905"
                                    className="px-8 py-3 bg-white text-green-800 text-lg font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg flex items-center"
                                >
                                    <Phone className="w-6 h-6 mr-2 inline" /> Call Now
                                </a>
                                <button
                                    onClick={handleBookNow}
                                    className="px-8 py-3 bg-green-600 text-white text-lg font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg flex items-center"
                                >
                                    <Calendar className="w-6 h-6 mr-2 inline" /> Book Service
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="md:w-1/2 mt-12 md:mt-0"
                        >
                            <div className="bg-white ml-56 p-8 rounded-2xl shadow-2xl max-w-lg mx-auto">
                                <h3 className="text-2xl font-extrabold mb-6 text-gray-800">
                                    Book a Carpenter in 3 Easy Steps
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-extrabold flex-shrink-0">
                                            1
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="font-bold text-xl text-gray-800 mb-1">
                                                Choose Your Service
                                            </h4>
                                            <p className="text-gray-600 text-base">
                                                Select from our range of carpentry services
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-extrabold flex-shrink-0">
                                            2
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="font-bold text-xl text-gray-800 mb-1">
                                                Pick a Convenient Time
                                            </h4>
                                            <p className="text-gray-600 text-base">
                                                We offer flexible scheduling options
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-extrabold flex-shrink-0">
                                            3
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="font-bold text-xl text-gray-800 mb-1">
                                                Get Expert Service
                                            </h4>
                                            <p className="text-gray-600 text-base">
                                                Our skilled carpenter will arrive with proper tools
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-8 px-6 py-3 bg-green-700 text-white text-lg font-bold rounded-xl hover:bg-green-800 transition-colors"
                                >
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-30">
                <div className="container mx-auto px-4">
                    <h2 className="text-6xl font-bold text-center mb-4">
                        Our Carpentry Services
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        We offer comprehensive woodworking and furniture services. Our
                        skilled carpenters can handle all types of wooden fixtures and
                        furniture needs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative">
                                <img
                                    src="https://img.freepik.com/free-photo/side-view-man-plaid-shirt-sawing-wood-timber-workshop_1098-19111.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                    alt="Furniture Repair"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Hammer className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">Furniture Repair</h3>
                            <p className="text-gray-600 mb-4">
                                Expert repair for all types of furniture including chairs,
                                tables, cabinets, and beds to extend their life and usability.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Joint and structure repairs</span>
                                </li>
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Surface refinishing</span>
                                </li>
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Parts replacement</span>
                                </li>
                            </ul>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative">
                                <img
                                    src="https://img.freepik.com/premium-photo/carpenter-woodworker-working-house-renovation_53876-60739.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                    alt="Custom Installations"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Ruler className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">
                                Custom Installations
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Custom-built shelving, cabinets, wardrobes, and other wooden
                                fixtures designed to perfectly fit your space.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Built-in storage solutions</span>
                                </li>
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Custom shelving units</span>
                                </li>
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Wardrobe installations</span>
                                </li>
                            </ul>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative">
                                <img
                                    src="https://img.freepik.com/premium-photo/handsome-young-man-safety-helmet-work-gloves-repairing-door-with-screwdriver_386167-10610.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                    alt="Door & Window Work"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <DoorClosed className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">
                                Door & Window Work
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Installation, repair, and adjustment of doors, windows, and
                                their frames to ensure proper operation and security.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Door alignment and fixing</span>
                                </li>
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Window frame repairs</span>
                                </li>
                                <li className="flex items-center">
                                    <Check
                                        size={24}
                                        className="text-green-500 mr-2 flex-shrink-0"
                                    />
                                    <span>Lock installation</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Package Selection */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-4">
                        Choose Your Service Package
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        Select the package that suits your carpentry needs. All packages
                        include service by skilled professionals.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
                        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-8 mx-auto md:mx-0">
                            <button
                                className={`px-4 py-2 rounded-md text-md font-medium ${selectedPackage === "essential"
                                        ? "bg-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                onClick={() => setSelectedPackage("essential")}
                            >
                                Essential
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-md font-medium ${selectedPackage === "standard"
                                        ? "bg-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                onClick={() => setSelectedPackage("standard")}
                            >
                                Standard
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-md font-medium ${selectedPackage === "premium"
                                        ? "bg-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                onClick={() => setSelectedPackage("premium")}
                            >
                                Premium
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {selectedPackage === "essential" && (
                            <>
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">Quick Repair</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹499</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Basic furniture and fixture repairs requiring minimal
                                        materials
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Chair/table wobble fix</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Door/drawer adjustments</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Hardware replacement</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>30-day service warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-300 relative lg:scale-105 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                                        <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            POPULAR
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Small Installation</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹899</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Installation of small furniture items and fixtures
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Shelf/rack installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Small cabinet assembly</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Door/window repairs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>3-month service warranty</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Material recommendations</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">Furniture Assembly</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹1,299</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Professional assembly of flat-pack and ready-to-assemble
                                        furniture
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Bed/wardrobe assembly</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Dining table/chairs assembly</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Cabinet/bookshelf assembly</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>3-month assembly warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </>
                        )}

                        {selectedPackage === "standard" && (
                            <>
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">Custom Shelving</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹2,499</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Custom-designed shelving solutions for your space
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Design consultation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Material selection</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Custom shelf fabrication</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Professional installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>6-month warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-300 relative lg:scale-105 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                                        <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            POPULAR
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Door & Window Package
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹3,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete door and window installation or repair
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Door installation/replacement</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Window frame repair</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Hardware upgrades</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Weatherproofing</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>6-month warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">
                                        Furniture Restoration
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹4,499</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete restoration of damaged or antique furniture
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Structural repairs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Wood restoration</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Refinishing</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Hardware restoration</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>1-year warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </>
                        )}

                        {selectedPackage === "premium" && (
                            <>
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">Custom Wardrobe</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹12,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Custom-designed and built wardrobe solution
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Design consultation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Material selection</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Custom fabrication</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Professional installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>2-year warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-300 relative lg:scale-105 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                                        <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            POPULAR
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Kitchen Renovation</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹25,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete kitchen cabinet renovation
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Design consultation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Custom cabinet fabrication</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Storage optimization</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Hardware selection & installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>3-year warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">Custom Furniture</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹15,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Fully custom-designed furniture pieces
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Design consultation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Premium material selection</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Bespoke craftsmanship</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Customized finishes</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>3-year warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-30">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-4 text-green-800">
                        How It Works
                    </h2>
                    <p className="text-center text-green-700 mb-12 max-w-3xl mx-auto text-lg">
                        Our simple process ensures you get quick and reliable carpentry
                        services without any hassle.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Book Service",
                                desc: "Choose your carpentry service and schedule a convenient appointment time.",
                                img: "https://img.freepik.com/premium-photo/booking-tickets-transport-internet-hotel-reservation-online-flight-booking-plane-travel-fly-check-buy-website-e-ticket-business-concept-buy-e-tickets-website_431724-2616.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
                            },
                            {
                                title: "Carpenter Visit",
                                desc: "Our skilled carpenter arrives at your location with all necessary tools and materials.",
                                img: "https://img.freepik.com/free-photo/full-shot-people-working-together_23-2149343982.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
                            },
                            {
                                title: "Job Execution",
                                desc: "The carpenter completes the work with quality craftsmanship and explains the process.",
                                img: "https://img.freepik.com/free-photo/planing-board-workshop_1098-14709.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
                            },
                            {
                                title: "Complete & Pay",
                                desc: "Final inspection ensures quality. Pay easily after you’re satisfied.",
                                img: "https://img.freepik.com/premium-photo/paying-via-nfc-factory_236854-12875.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-10 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                        <img
                                            src={step.img}
                                            alt={`Step ${index + 1}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-semibold text-2xl mb-3 text-green-700">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-base">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professionals Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-12 text-green-800">
                        Our Professional Carpenters
                    </h2>
                    <p className="text-center text-green-700 mb-12 max-w-3xl mx-auto text-lg">
                        Our carpenters are skilled craftsmen with years of experience in
                        woodworking and furniture making.
                    </p>
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-40 h-40 bg-gradient-to-br from-green-200 to-green-400 rounded-2xl overflow-hidden border-4 border-green-300 group-hover:border-green-600 transition-all duration-300 shadow-lg flex items-center justify-center">
                                        <img
                                            src="https://images.unsplash.com/photo-1613979736942-77aa8602bd46?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                                            alt="Professional Carpenter"
                                            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center mb-3">
                                        <h3 className="font-bold text-2xl text-green-800">
                                            Our Master Carpenters
                                        </h3>
                                        <div className="ml-4 px-4 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-300 shadow-sm animate-pulse">
                                            Verified
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={18}
                                                    className="text-green-500 fill-green-500"
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-base text-green-700 font-semibold">
                                            (800+ customer ratings)
                                        </span>
                                    </div>
                                    <p className="text-green-800 mb-5 text-lg">
                                        Our carpenters have an average of{" "}
                                        <span className="font-bold text-green-700">10+ years</span>{" "}
                                        of experience in woodworking and furniture craftsmanship.
                                        They are skilled in various types of wood and construction
                                        techniques, ensuring your project is completed to the
                                        highest standards.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                                            <CheckCircle size={18} className="text-green-500 mr-2" />
                                            <span className="text-sm font-medium text-green-800">
                                                Skilled craftsmen
                                            </span>
                                        </div>
                                        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                                            <CheckCircle size={18} className="text-green-500 mr-2" />
                                            <span className="text-sm font-medium text-green-800">
                                                Background-verified
                                            </span>
                                        </div>
                                        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                                            <CheckCircle size={18} className="text-green-500 mr-2" />
                                            <span className="text-sm font-medium text-green-800">
                                                Experienced
                                            </span>
                                        </div>
                                        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                                            <CheckCircle size={18} className="text-green-500 mr-2" />
                                            <span className="text-sm font-medium text-green-800">
                                                Professional tools
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="py-16 bg-gray-30">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-4 text-green-800">
                        Customer Reviews
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        See what our customers have to say about their experience with our
                        carpentry services.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Review Card 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/women/33.jpg"
                                    alt="Customer"
                                    className="w-full h-full object-cover rounded-full border-2 border-white group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex justify-center mt-10 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={32}
                                        className="text-green-400 fill-green-400"
                                    />
                                ))}
                            </div>
                            <p className="my-4 text-gray-700 text-lg text-center">
                                "The carpenter was exceptionally skilled. He fixed our dining
                                table that had been wobbling for months. He was professional,
                                cleaned up afterward, and the table is now more stable than when
                                it was new!"
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Neha Singh
                                </h4>
                                <p className="text-sm text-gray-500">Bangalore</p>
                            </div>
                        </div>

                        {/* Review Card 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-124 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/men/47.jpg"
                                    alt="Customer"
                                    className="w-full h-full object-cover rounded-full border-2 border-white group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex justify-center mt-10 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={32}
                                        className="text-green-400 fill-green-400"
                                    />
                                ))}
                            </div>
                            <p className="my-4 text-gray-700 text-lg text-center">
                                "We had custom shelves built for our living room, and they
                                turned out beautifully. The carpenter suggested some design
                                improvements that made the shelves even more functional.
                                Excellent craftsmanship!"
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Vikram Mehta
                                </h4>
                                <p className="text-sm text-gray-500">Delhi</p>
                            </div>
                        </div>

                        {/* Review Card 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/men/22.jpg"
                                    alt="Customer"
                                    className="w-full h-full object-cover rounded-full border-2 border-white group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex justify-center mt-10 mb-2">
                                {[...Array(4)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={32}
                                        className="text-green-400 fill-green-400"
                                    />
                                ))}
                                <Star size={32} className="text-gray-300" />
                            </div>
                            <p className="my-4 text-gray-700 text-lg text-center">
                                "I had several doors that wouldn't close properly. The carpenter
                                fixed them all quickly and efficiently. They now close smoothly
                                without any issues. Great service, though slightly on the
                                expensive side."
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Aditya Sharma
                                </h4>
                                <p className="text-sm text-gray-500">Mumbai</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-12 text-green-800">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-6xl mx-auto flex flex-col gap-8">
                        {/* FAQ 1 */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-4/5 w-full md:order-1 order-2">
                                <div className="bg-white px-14 py-6 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-600 mr-3">
                                            <Info size={32} />
                                        </span>
                                        What types of wood do you work with?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Our carpenters are skilled in working with various types of
                                        wood including teak, pine, oak, mahogany, plywood, MDF, and
                                        more. We can recommend the best material for your specific
                                        project based on your budget, aesthetic preferences, and
                                        functional requirements.
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/5 w-full flex justify-center md:justify-end mb-4 md:mb-0 md:order-2 order-1">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">1</span>
                                </div>
                            </div>
                        </div>
                        {/* FAQ 2 */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-1/5 w-full flex justify-center md:justify-start mb-4 md:mb-0">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">2</span>
                                </div>
                            </div>
                            <div className="md:w-4/5 w-full">
                                <div className="bg-white px-14 py-6 rounded-2xl shadow-xl border-r-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-600 mr-3">
                                            <Info size={32} />
                                        </span>
                                        How long does a typical carpentry job take?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        The timeline depends on the complexity and scope of the
                                        project. Simple repairs might take 1–2 hours, while
                                        furniture assembly typically takes 2–4 hours. Custom
                                        installations like shelving or wardrobes can take 1–3 days.
                                        For larger projects like custom furniture or kitchen
                                        renovations, we'll provide a detailed timeline during the
                                        consultation.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* FAQ 3 */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-4/5 w-full md:order-1 order-2">
                                <div className="bg-white px-14 py-6 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-600 mr-3">
                                            <Info size={32} />
                                        </span>
                                        Do you provide materials or should I purchase them?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        We can handle material sourcing for you, ensuring quality
                                        materials that are appropriate for your project.
                                        Alternatively, if you prefer to purchase materials yourself,
                                        our carpenters can work with what you provide. We'll discuss
                                        material requirements during the initial consultation.
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/5 w-full flex justify-center md:justify-end mb-4 md:mb-0 md:order-2 order-1">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">3</span>
                                </div>
                            </div>
                        </div>
                        {/* FAQ 4 */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-1/5 w-full flex justify-center md:justify-start mb-4 md:mb-0">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">4</span>
                                </div>
                            </div>
                            <div className="md:w-4/5 w-full">
                                <div className="bg-white px-14 py-6 rounded-2xl shadow-xl border-r-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-600 mr-3">
                                            <AlertCircle size={32} />
                                        </span>
                                        What is covered under your warranty?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Our warranties cover workmanship and installation defects.
                                        This includes issues like joints coming apart, structural
                                        failures, or hardware malfunctions when they're due to our
                                        installation. Normal wear and tear, damage from misuse, or
                                        issues with materials you provided yourself are not covered
                                        under warranty.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* FAQ 5 */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-4/5 w-full md:order-1 order-2">
                                <div className="bg-white px-14 py-6 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-600 mr-3">
                                            <AlertCircle size={32} />
                                        </span>
                                        Can you match existing woodwork in my home?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Yes, our skilled carpenters can match existing woodwork
                                        including color, grain, and style. We can take samples or
                                        photos of your existing furniture or fixtures to ensure new
                                        pieces blend seamlessly with your current decor. For precise
                                        color matching, we can create custom stains or finishes.
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/5 w-full flex justify-center md:justify-end mb-4 md:mb-0 md:order-2 order-1">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="md:w-2/3 mb-8 md:mb-0">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Ready to transform your space?
                                </h2>
                                <p className="text-green-100 text-lg mb-0">
                                    Our skilled carpenters are ready to help with all your
                                    woodworking and furniture needs.
                                </p>
                            </div>
                            <div className="md:w-1/3 flex flex-col md:items-end gap-4">
                                <a
                                    href="tel:+918008330905"
                                    className="px-6 py-3 text-lg bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                                >
                                    <Phone className="w-6 h-6 mr-2 inline" /> Call Now
                                </a>
                                <button
                                    onClick={handleBookNow}
                                    className="px-6 py-3 text-lg bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 border border-white border-opacity-25 transition-colors shadow-md"
                                >
                                    <Calendar className="w-6 h-6 mr-2 inline" /> Book Online
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Carpenter;

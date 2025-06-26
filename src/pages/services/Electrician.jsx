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
    ShieldCheck,
    Wrench,
    Zap,
    Info,
    AlertCircle,
} from "lucide-react";
import machaLogo from "../../assets/macha-logo.jpg";

const Electrician = () => {
    const navigate = useNavigate();
    const [selectedPackage, setSelectedPackage] = useState("essential");

    const handleBookNow = () => {
        navigate("/book");
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 pb-16">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[93vh] mt-3 py-24 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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
                                Professional Electrical Services
                            </h1>
                            <p className="text-2xl md:text-3xl mb-10 text-green-100">
                                Expert electricians for all your electrical repair,
                                installation, and maintenance needs
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className="text-green-300 fill-green-300"
                                        />
                                    ))}
                                    <span className="ml-2 font-semibold">4.8/5</span>
                                    <span className="ml-2 text-white text-opacity-80">
                                        (2.4K+ reviews)
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <Clock size={20} className="mr-2" />
                                    <span>Within 90 minutes</span>
                                </div>

                                <div className="flex items-center">
                                    <Shield size={20} className="mr-2" />
                                    <span>30-day warranty</span>
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
                                    Book an Electrician in 3 Easy Steps
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
                                                Select from our range of electrical services
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
                                                We offer same-day and next-day slots
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-extrabold flex-shrink-0">
                                            3
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="font-bold text-xl text-gray-800 mb-1">
                                                Relax and Confirm
                                            </h4>
                                            <p className="text-gray-600 text-base">
                                                Our professional will arrive at your doorstep
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
                        Our Electrical Services
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        We offer a wide range of electrical services for your home and
                        office. Our certified electricians are trained to handle all types
                        of electrical issues.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-8xl mx-auto">
                        {/* Electrical Repairs */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700 flex flex-col items-start text-left">
                            <div className="mb-6 rounded-xl overflow-hidden h-56 relative w-full">
                                <img
                                    src="https://img.freepik.com/free-photo/electrician-working-switchboard-with-electrical-connection-cable-copy-space_169016-52810.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_items_boosted&w=740"
                                    alt="Electrical Repairs"
                                    className="w-full h-full object-cover rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Wrench className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">
                                Electrical Repairs
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Fix electrical issues, replace damaged components, and restore
                                functionality to your electrical systems.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Switch and socket repairs
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Circuit breaker troubleshooting
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Fan & light fixture issues
                                </li>
                            </ul>
                        </div>

                        {/* Installations */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700 flex flex-col items-start text-left">
                            <div className="mb-6 rounded-xl overflow-hidden h-56 relative w-full">
                                <img
                                    src="https://img.freepik.com/free-photo/male-electrician-working-switchboard-with-fuses_169016-52975.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                    alt="Installations"
                                    className="w-full h-full object-cover rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Zap className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">Installations</h3>
                            <p className="text-gray-600 mb-4">
                                Professional installation of lighting fixtures, fans, switches,
                                outlets and other electrical components.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Ceiling fan installation
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Light fixture mounting
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Outlet & switch installation
                                </li>
                            </ul>
                        </div>

                        {/* Safety Inspections */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700 flex flex-col items-start text-left">
                            <div className="mb-6 rounded-xl overflow-hidden h-56 relative w-full">
                                <img
                                    src="https://img.freepik.com/premium-photo/robotics-engineer-working-maintenance-modern-robotic-arm-factory-warehouse_35752-13636.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                    alt="Safety Inspections"
                                    className="w-full h-full object-cover rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <ShieldCheck className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">
                                Safety Inspections
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Comprehensive electrical safety checks to identify potential
                                hazards and ensure your home's electrical system is up to code.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Wiring inspection
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Circuit load analysis
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Safety certificate issuance
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
                    <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
                        Select the package that suits your needs. All packages include
                        service by certified professionals.
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
                                    <h3 className="text-xl font-bold mb-2">Emergency Fixes</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹499</span>
                                        <span className="text-gray-500 ml-2">per visit</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Quick fixes for electrical emergencies and minor repairs
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Switch & socket repairs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Simple light fixture fixes</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>MCB replacement</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>15-day service warranty</span>
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
                                        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            POPULAR
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Home Electrical Safety
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹899</span>
                                        <span className="text-gray-500 ml-2">per visit</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete inspection & essential repairs for your home
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Full electrical safety audit</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>MCB & switchboard check</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Minor repairs included</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>30-day service warranty</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Safety certificate</span>
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
                                        Installation Package
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹799</span>
                                        <span className="text-gray-500 ml-2">per unit</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Professional installation of electrical fixtures
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Fan installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Light fixture mounting</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Switch & socket installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>30-day installation warranty</span>
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
                                    <h3 className="text-xl font-bold mb-2">Rewiring Basic</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹1,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Partial rewiring for specific areas of your home
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Single room rewiring</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>High-quality copper wiring</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>New switches & sockets</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                                        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            POPULAR
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Full Home Electrical Upgrade
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹5,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete electrical system upgrade for your home
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>MCB & distribution box upgrade</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Complete wiring inspection</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Prioritized problem areas</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Advanced safety features</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
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

                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">Power Backup Setup</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹2,499</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Inverter/UPS installation and setup
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Backup system installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Wiring for critical areas</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>System testing & fine-tuning</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>9-month service warranty</span>
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
                                    <h3 className="text-xl font-bold mb-2">Smart Home Wiring</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹8,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Wiring setup for smart home integration
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Smart switch preparation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Hub wiring setup</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>IoT device compatibility</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>1-year technical support</span>
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
                                        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            POPULAR
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Premium Annual Maintenance
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹12,999</span>
                                        <span className="text-gray-500 ml-2">/year</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete electrical maintenance for 12 months
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>4 scheduled maintenance visits</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>2 emergency calls included</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>20% discount on parts</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Priority scheduling</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Annual safety certification</span>
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
                                        Energy Efficiency Audit
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹3,999</span>
                                        <span className="text-gray-500 ml-2">one-time</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Comprehensive energy usage assessment
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Complete energy usage analysis</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Savings opportunity identification</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Detailed recommendations report</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>One follow-up consultation</span>
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
            <section className="py-20 bg-gray-30">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-6">How It Works</h2>
                    <p className="text-center text-gray-600 mb-14 max-w-3xl mx-auto text-lg">
                        Our simple process ensures you get quick and reliable electrical
                        services without any hassle.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                        {/* Step 1 */}
                        <div className="bg-white rounded-2xl p-10 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="flex justify-center mb-6">
                                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="https://img.freepik.com/free-photo/woman-using-smartphone-fitness-gym-close-up_169016-46945.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                        alt="Step 1"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                </div>
                            </div>
                            <h3 className="font-semibold text-2xl mb-3 text-green-700">
                                Book Service
                            </h3>
                            <p className="text-gray-600 text-base">
                                Select your service and choose a convenient time slot online or
                                via phone.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-2xl p-10 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="flex justify-center mb-6">
                                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="https://img.freepik.com/free-photo/ready-start-my-work-proud-attractive-electrician-with-protective-gear-holding-toolbox-electricity-cables_662251-590.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                        alt="Step 2"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                </div>
                            </div>
                            <h3 className="font-semibold text-2xl mb-3 text-green-700">
                                Electrician Arrival
                            </h3>
                            <p className="text-gray-600 text-base">
                                Our qualified electrician arrives at your doorstep with all
                                necessary equipment.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-2xl p-10 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="flex justify-center mb-6">
                                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="https://img.freepik.com/premium-photo/side-view-electrician-working-home_1048944-23856435.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                        alt="Step 3"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                </div>
                            </div>
                            <h3 className="font-semibold text-2xl mb-3 text-green-700">
                                Diagnosis & Quote
                            </h3>
                            <p className="text-gray-600 text-base">
                                The electrician assesses the issue and provides an upfront quote
                                before starting work.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white rounded-2xl p-10 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="flex justify-center mb-6">
                                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="https://img.freepik.com/free-photo/male-plumber-working-with-client-fix-kitchen-problems_23-2150990690.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                        alt="Step 4"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                </div>
                            </div>
                            <h3 className="font-semibold text-2xl mb-3 text-green-700">
                                Service & Payment
                            </h3>
                            <p className="text-gray-600 text-base">
                                Work is completed to your satisfaction, followed by easy digital
                                payment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professionals */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-4">
                        Our Professional Electricians
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        All our electricians are certified, background-verified, and
                        experienced in handling various electrical issues.
                    </p>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-40 h-40 bg-gradient-to-br from-green-200 to-green-400 rounded-2xl overflow-hidden border-4 border-green-300 group-hover:border-green-600 transition-all duration-300 shadow-lg flex items-center justify-center">
                                        <img
                                            src="data:image/jpeg;base64,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"
                                            alt="Professional Electrician"
                                            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center mb-3">
                                        <h3 className="font-bold text-2xl text-green-800">
                                            Our Certified Electricians
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
                                                    className="text-green-400 fill-green-400"
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-base text-gray-700 font-semibold">
                                            (1,200+ customer ratings)
                                        </span>
                                    </div>

                                    <p className="text-gray-700 mb-5 text-lg">
                                        Our electricians have an average of{" "}
                                        <span className="font-bold text-green-700">8+ years</span>{" "}
                                        of experience and undergo rigorous training and background
                                        verification. They are equipped with professional tools and
                                        follow all safety protocols.
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                                            <CheckCircle size={18} className="text-green-500 mr-2" />
                                            <span className="text-sm font-medium text-green-800">
                                                Certified
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
                    <h2 className="text-5xl font-bold text-center mb-4">
                        Customer Reviews
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        See what our customers have to say about their experience with our
                        electrical services.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Review Card 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/women/45.jpg"
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
                                "The electrician was very professional and fixed our fan issue
                                quickly. He explained the problem clearly and gave us advice to
                                prevent future issues."
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Priya Sharma
                                </h4>
                                <p className="text-sm text-gray-500">New Delhi</p>
                            </div>
                        </div>

                        {/* Review Card 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
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
                                "Excellent service! The home electrical safety inspection was
                                thorough and I feel much safer now. Will definitely recommend to
                                friends and family."
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Rajesh Kumar
                                </h4>
                                <p className="text-sm text-gray-500">Mumbai</p>
                            </div>
                        </div>

                        {/* Review Card 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/women/68.jpg"
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
                                "Got my entire house rewired. The team was punctual, neat, and
                                efficient. They finished ahead of schedule and cleaned up
                                thoroughly after the job."
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Anita Desai
                                </h4>
                                <p className="text-sm text-gray-500">Bangalore</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="max-w-6xl mx-auto flex flex-col gap-8">
                        {/* FAQ 1 - Left */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-4/5 w-full md:order-1 order-2">
                                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-500 mr-3">
                                            <Info size={32} />
                                        </span>
                                        How quickly can you send an electrician?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        For most standard services, we can send an electrician
                                        within 90 minutes in emergency cases. For non-emergency
                                        services, same-day or next-day appointments are typically
                                        available.
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/5 w-full flex justify-center md:justify-end mb-4 md:mb-0 md:order-2 order-1">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">1</span>
                                </div>
                            </div>
                        </div>

                        {/* FAQ 2 - Right */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-1/5 w-full flex justify-center md:justify-start mb-4 md:mb-0">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">2</span>
                                </div>
                            </div>
                            <div className="md:w-4/5 w-full">
                                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-r-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-500 mr-3">
                                            <Info size={32} />
                                        </span>
                                        Are your electricians licensed and insured?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Yes, all our electricians are fully licensed, certified, and
                                        insured. They have undergone thorough background checks and
                                        have extensive experience in residential and commercial
                                        electrical work.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ 3 - Left */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-4/5 w-full md:order-1 order-2">
                                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-500 mr-3">
                                            <Info size={32} />
                                        </span>
                                        Do you provide a warranty on your work?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Yes, we provide a service warranty on all our electrical
                                        work. The warranty period depends on the service package,
                                        ranging from 15 days to 1 year. Parts installed also come
                                        with manufacturer warranties.
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/5 w-full flex justify-center md:justify-end mb-4 md:mb-0 md:order-2 order-1">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">3</span>
                                </div>
                            </div>
                        </div>

                        {/* FAQ 4 - Right */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-1/5 w-full flex justify-center md:justify-start mb-4 md:mb-0">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                    <span className="text-white text-3xl font-bold">4</span>
                                </div>
                            </div>
                            <div className="md:w-4/5 w-full">
                                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-r-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-500 mr-3">
                                            <AlertCircle size={32} />
                                        </span>
                                        What payment methods do you accept?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        We accept cash, major credit/debit cards, UPI payments, and
                                        online bank transfers. Payment is collected after the
                                        service is completed to your satisfaction.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ 5 - Left */}
                        <div className="flex flex-col md:flex-row items-center md:items-start group">
                            <div className="md:w-4/5 w-full md:order-1 order-2">
                                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                                        <span className="text-green-500 mr-3">
                                            <AlertCircle size={32} />
                                        </span>
                                        Will the electrician bring all necessary parts and
                                        equipment?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Our electricians arrive with professional tools and common
                                        replacement parts. For specialized components, they can
                                        source them for you or provide recommendations on what to
                                        purchase.
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
                                    Ready to fix your electrical issues?
                                </h2>
                                <p className="text-green-100 text-lg mb-0">
                                    Our professional electricians are just a call away. Book now
                                    for same-day service!
                                </p>
                            </div>
                            <div className="md:w-1/3 flex flex-col md:items-end gap-4">
                                <a
                                    href="tel:+918008330905"
                                    className="px-6 py-3 bg-white text-lg text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                                >
                                    <Phone className="w-6 h-5 mr-6 inline" /> Call Now
                                </a>
                                <button
                                    onClick={handleBookNow}
                                    className="px-6 py-3 bg-green-700 text-lg text-white font-semibold rounded-lg hover:bg-green-800 border border-white border-opacity-25 transition-colors shadow-md"
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

export default Electrician;

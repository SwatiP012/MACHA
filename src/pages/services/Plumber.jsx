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
    Droplet,
    ShowerHead,
    Info,
    AlertCircle,
    Wrench,
} from "lucide-react";
import machaLogo from "../../assets/macha-logo.jpg";

const Plumber = () => {
    const navigate = useNavigate();
    const [selectedPackage, setSelectedPackage] = useState("essential");

    const handleBookNow = () => {
        navigate("/book");
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 pb-16">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[93vh] mt-3 py-24 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply">
                <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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
                            {/* MACHA Logo display */}
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
                                Expert Plumbing Services
                            </h1>
                            <p className="text-2xl md:text-3xl mb-10 text-green-100">
                                Reliable plumbers for all your plumbing repairs, installations,
                                and maintenance needs
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
                                    <span className="ml-2 font-semibold">4.9/5</span>
                                    <span className="ml-2 text-white text-opacity-80">
                                        (1.8K+ reviews)
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <Clock size={20} className="mr-2" />
                                    <span>Within 60 minutes</span>
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
                                    Book a Plumber in 3 Easy Steps
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
                                                Select from our range of plumbing services
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
                                                Relax
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
                        Our Plumbing Services
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        We offer comprehensive plumbing services for residential and
                        commercial properties. Our licensed plumbers can handle all types of
                        plumbing issues.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Leak Repairs */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-6 rounded-xl overflow-hidden h-40 relative">
                                <img
                                    src="https://img.freepik.com/free-photo/man-fixing-kitchen-sink_53876-13430.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                    alt="Leak Repairs"
                                    className="w-full h-full object-cover rounded-lg border-2 border-green-700 transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Droplet className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">Leak Repairs</h3>
                            <p className="text-gray-600 mb-4">
                                Quick identification and fixing of leaks in pipes, faucets, and
                                fixtures to prevent water damage and waste.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Faucet and shower repairs
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Pipe leak fixes
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Toilet leak detection
                                </li>
                            </ul>
                        </div>

                        {/* Installations */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-6 rounded-xl overflow-hidden h-40 relative">
                                <img
                                    src="https://img.freepik.com/premium-photo/black-man-plumber-maintenance-bathroom-fixing-sink-pipe-with-wrench-plumbing-industry-manual-labor-male-with-focus-trade-handyman-doing-repairs-with-tools-home-renovation_590464-165471.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                    alt="Installations"
                                    className="w-full h-full object-cover rounded-lg border-2 border-green-700 transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <ShowerHead className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">Installations</h3>
                            <p className="text-gray-600 mb-4">
                                Professional installation of sinks, faucets, toilets, showers,
                                water heaters, and other plumbing fixtures.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Bathroom fixture installation
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Kitchen sink & faucet fitting
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Water heater setup
                                </li>
                            </ul>
                        </div>

                        {/* Drain Services */}
                        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-6 rounded-xl overflow-hidden h-40 relative">
                                <img
                                    src="https://img.freepik.com/free-photo/asian-plumber-blue-overalls-clearing-blockage-drain_1098-17773.jpg?ga=GA1.1.1872067447.1750850496&w=740"
                                    alt="Drain Services"
                                    className="w-full h-full object-cover rounded-lg border-2 border-green-700 transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                                <motion.div
                                    className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Wrench className="w-7 h-7 text-green-600" />
                                </motion.div>
                            </div>
                            <h3 className="text-3xl font-semibold mb-2">Drain Services</h3>
                            <p className="text-gray-600 mb-4">
                                Clear clogged drains and prevent future blockages with our
                                professional drain cleaning and maintenance services.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Drain unclogging
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Hydro jetting
                                </li>
                                <li className="flex items-center">
                                    <Check size={24} className="text-green-500 mr-2" />
                                    Preventive maintenance
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
                        Select the package that suits your plumbing needs. All packages
                        include service by certified professionals.
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
                                    <h3 className="text-xl font-bold mb-2">Quick Fix</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹599</span>
                                        <span className="text-gray-500 ml-2">per visit</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Basic plumbing repairs for minor issues and quick fixes
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Leaky faucet repair</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Minor drain unblocking</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Toilet flush repair</span>
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
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
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
                                        Home Plumbing Check
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹999</span>
                                        <span className="text-gray-500 ml-2">per visit</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete inspection and essential repairs for your home
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Full plumbing system inspection</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Water pressure check</span>
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
                                            <span>Written report with recommendations</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">
                                        Fixture Installation
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹899</span>
                                        <span className="text-gray-500 ml-2">per unit</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Professional installation of plumbing fixtures
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Faucet installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Sink replacement</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Toilet installation</span>
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
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </>
                        )}

                        {selectedPackage === "standard" && (
                            <>
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">Drain Deep Clean</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹1,499</span>
                                        <span className="text-gray-500 ml-2">per service</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Professional deep cleaning for stubborn drain blockages
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Hydro jetting service</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Multiple drain treatment</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>CCTV drain inspection</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>3-month clog-free guarantee</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
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
                                        Bathroom Renovation
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹6,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete plumbing update for your bathroom
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Fixture replacement (sink, toilet)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Shower/bath installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Pipe replacement if needed</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Water-saving options</span>
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
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">
                                        Water Heater Service
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹2,499</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Installation, repair and maintenance of water heaters
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Geyser installation/replacement</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>System flushing</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Temperature adjustment</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>6-month service warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </>
                        )}

                        {selectedPackage === "premium" && (
                            <>
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">
                                        Kitchen Plumbing Package
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹7,999</span>
                                        <span className="text-gray-500 ml-2">onwards</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete kitchen plumbing renovation
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Sink & faucet installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Dishwasher hookup</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Garbage disposal setup</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>1-year parts warranty</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
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
                                        Annual Maintenance Plan
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹14,999</span>
                                        <span className="text-gray-500 ml-2">/year</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Complete plumbing maintenance for 12 months
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
                                            <span>3 emergency calls included</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>25% discount on parts</span>
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
                                            <span>Annual plumbing certification</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                                    <h3 className="text-xl font-bold mb-2">
                                        Water Efficiency Package
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold">₹8,499</span>
                                        <span className="text-gray-500 ml-2">one-time</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Water-saving upgrades for your entire home
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Low-flow fixture installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Dual-flush toilet conversion</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Leak detection and repair</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            />
                                            <span>Water usage assessment</span>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
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
                    <h2 className="text-5xl font-bold text-center mb-4">How It Works</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        Our simple process ensures you get quick and reliable plumbing
                        services without any hassle.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {/* Step 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="flex justify-center mb-4">
                                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="https://img.freepik.com/premium-photo/young-couple-talking-using-tablet-kitchen-home_256269-182.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                                        alt="Step 1"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 border-4 border-green-200 group-hover:border-green-500 transition-all duration-300">
                                1
                            </div>
                            <h3 className="font-semibold text-xl mb-2 text-green-700">Book Service</h3>
                            <p className="text-gray-600">
                                Select your plumbing service and choose a convenient time slot.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="flex justify-center mb-4">
                                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="https://img.freepik.com/free-photo/cheerful-asian-plumber-overalls-standing-door-with-toolbox_1098-17819.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                                        alt="Step 2"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 border-4 border-green-200 group-hover:border-green-500 transition-all duration-300">
                                2
                            </div>
                            <h3 className="font-semibold text-xl mb-2 text-green-700">Plumber Arrival</h3>
                            <p className="text-gray-600">
                                Our qualified plumber arrives at your doorstep with all necessary equipment.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="flex justify-center mb-4">
                                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="https://img.freepik.com/free-photo/side-view-man-working-as-plumber_23-2150746307.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                                        alt="Step 3"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 border-4 border-green-200 group-hover:border-green-500 transition-all duration-300">
                                3
                            </div>
                            <h3 className="font-semibold text-xl mb-2 text-green-700">Diagnosis & Quote</h3>
                            <p className="text-gray-600">
                                The plumber assesses the issue and provides an upfront quote before starting work.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="flex justify-center mb-4">
                                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="https://img.freepik.com/premium-photo/close-up-view-plumber-receiving-cash-work-he-is-done-kitchen_146671-76441.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                                        alt="Step 4"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 border-4 border-green-200 group-hover:border-green-500 transition-all duration-300">
                                4
                            </div>
                            <h3 className="font-semibold text-xl mb-2 text-green-700">Service & Payment</h3>
                            <p className="text-gray-600">
                                Work is completed to your satisfaction, followed by easy digital payment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professionals */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-4">
                        Our Professional Plumbers
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        All our plumbers are certified, background-verified, and experienced
                        in handling various plumbing issues.
                    </p>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-40 h-40 bg-gradient-to-br from-green-200 to-green-400 rounded-2xl overflow-hidden border-4 border-green-300 group-hover:border-green-600 transition-all duration-300 shadow-lg flex items-center justify-center">
                                        <img
                                            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                                            alt="Professional Plumber"
                                            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center mb-3">
                                        <h3 className="font-bold text-2xl text-green-800">
                                            Our Certified Plumbers
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
                                            (950+ customer ratings)
                                        </span>
                                    </div>

                                    <p className="text-gray-700 mb-5 text-lg">
                                        Our plumbers have a minimum of{" "}
                                        <span className="font-bold text-green-700">5+ years</span>{" "}
                                        of experience and undergo regular training on the latest
                                        plumbing techniques and technologies. They are equipped with
                                        professional-grade tools to handle any plumbing situation.
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                                            <CheckCircle size={18} className="text-green-500 mr-2" />
                                            <span className="text-sm font-medium text-green-800">
                                                Licensed
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
                        plumbing services.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Review Card 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/men/54.jpg"
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
                                "The plumber arrived on time and quickly identified the issue
                                with our kitchen sink. He explained everything clearly and fixed
                                it without making a mess. Great service!"
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Arjun Kapoor
                                </h4>
                                <p className="text-sm text-gray-500">Hyderabad</p>
                            </div>
                        </div>

                        {/* Review Card 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/women/28.jpg"
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
                                "I had a major bathroom renovation done through their premium
                                service package. The team was professional, neat, and completed
                                the work ahead of schedule. Very satisfied!"
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Meera Patel
                                </h4>
                                <p className="text-sm text-gray-500">Mumbai</p>
                            </div>
                        </div>

                        {/* Review Card 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/men/76.jpg"
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
                                "Called for an emergency leak at midnight, and they had a
                                plumber at my door within an hour. Fast response, fair pricing,
                                and the leak was fixed perfectly. Would recommend for emergency
                                services."
                            </p>
                            <div className="flex flex-col items-center mt-4">
                                <h4 className="font-semibold text-green-800 text-2xl">
                                    Rahul Verma
                                </h4>
                                <p className="text-sm text-gray-500">Pune</p>
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
                                        How quickly can you respond to a plumbing emergency?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        For plumbing emergencies like burst pipes or major leaks, we
                                        aim to dispatch a plumber within 60 minutes. For
                                        non-emergency services, we offer same-day or next-day
                                        appointments based on availability.
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
                                        Are your plumbers licensed and insured?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Yes, all our plumbers are fully licensed, certified, and
                                        insured. They have undergone thorough background checks and
                                        have extensive experience in residential and commercial
                                        plumbing work.
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
                                        Do you provide warranties on your plumbing work?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Yes, we provide service warranties on all our plumbing work.
                                        The warranty period depends on the service package, ranging
                                        from 15 days for basic repairs to 1 year for premium
                                        installations and renovations.
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
                                        How are your plumbing services priced?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        We provide transparent pricing with no hidden fees. For
                                        basic services, we charge a fixed rate. For complex jobs,
                                        our plumber will diagnose the issue and provide a detailed
                                        quote before starting any work, which you can approve.
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
                                        Can you source and supply plumbing fixtures?
                                    </h3>
                                    <p className="text-gray-700 text-lg pl-12">
                                        Yes, we can supply high-quality plumbing fixtures from
                                        trusted brands. Alternatively, if you've already purchased
                                        your fixtures, our plumbers are happy to install them. We
                                        also offer guidance on selecting appropriate fixtures for
                                        your needs.
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
            <section className="py-12 bg-gray-30">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="md:w-2/3 mb-8 md:mb-0">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Need a plumber today?
                                </h2>
                                <p className="text-green-100 text-lg mb-0">
                                    Our professional plumbers are just a call away. Book now for
                                    same-day service!
                                </p>
                            </div>
                            <div className="md:w-1/3 flex flex-col md:items-end gap-4">
                                <a
                                    href="tel:+918008330905"
                                    className="px-6 py-3 bg-white text-lg text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                                >
                                    <Phone className="w-6 h-6 mr-2 inline" /> Call Now
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

export default Plumber;

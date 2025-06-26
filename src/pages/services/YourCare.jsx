import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Phone, Calendar, ArrowLeft, Users, Home, Heart, Baby, User, PawPrint, HeartPulse, Star, Send
} from 'lucide-react';

const caregivers = [
    {
        icon: <Users className="w-8 h-8 text-fuchsia-600" />,
        title: "Elder Care",
        desc: "Compassionate support for seniors, including daily assistance, companionship, and health monitoring."
    },
    {
        icon: <Baby className="w-8 h-8 text-fuchsia-600" />,
        title: "Child Care",
        desc: "Trusted caregivers for infants and children, ensuring safety, learning, and fun at home."
    },
    {
        icon: <Heart className="w-8 h-8 text-fuchsia-600" />,
        title: "Maternity Support",
        desc: "Pre and post-natal care for mothers and newborns, including feeding, hygiene, and emotional support."
    },
    {
        icon: <User className="w-8 h-8 text-fuchsia-600" />,
        title: "Adult Assistance",
        desc: "Personalized care for adults needing temporary or ongoing support due to illness or disability."
    },
    {
        icon: <PawPrint className="w-8 h-8 text-fuchsia-600" />,
        title: "Pet Care",
        desc: "Pet sitting, feeding, walking, and companionship by animal-loving caregivers."
    },
    {
        icon: <HeartPulse className="w-8 h-8 text-fuchsia-600" />,
        title: "Patient/Home Health Care",
        desc: "Professional care for patients at home, including medication, hygiene, and recovery support."
    }
];

const plans = [
    "Hourly", "Daily", "Weekly", "Monthly"
];

const assurances = [
    "Background-verified caregivers",
    "Safety-first approach",
    "Personalized attention",
    "Flexible scheduling",
    "Local employment empowerment"
];

const testimonials = [
    {
        name: "Mrs. Sharma",
        role: "Daughter of Elderly Client",
        quote: "Your Care gave us peace of mind. The caregiver was kind, punctual, and truly cared for my mother.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        name: "Rohit S.",
        role: "Parent",
        quote: "We booked Your Care for our toddler. The nanny was professional and our child loved her!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/43.jpg"
    }
];

const YourCare = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-b from-white to-fuchsia-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center pt-16 overflow-hidden"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-fuchsia-900/70 mix-blend-multiply" />
                <div className="absolute top-20 left-4 z-20">
                    <Link
                        to="/"
                        className="inline-flex items-center text-fuchsia-200 hover:text-white transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="font-medium">Back to Services</span>
                    </Link>
                </div>
                <div className="relative z-10 w-full max-w-3xl mx-auto px-4 text-white text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 bg-fuchsia-500/30 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-fuchsia-400/30 text-5xl">
                            🧑‍🤝‍🧑
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-fuchsia-300">Your CARE</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-6 text-fuchsia-100 max-w-2xl mx-auto">
                            Flexible & Personal Care, Anytime. Elder, child, maternity, adult, pet, and patient care by trusted, verified caregivers.
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <a
                                href="tel:+918008330905"
                                className="px-8 py-4 bg-white text-fuchsia-700 font-semibold rounded-full shadow-lg flex items-center"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                Call For Care
                            </a>
                            <button
                                onClick={() => navigate('/book')}
                                className="px-8 py-4 bg-fuchsia-500 text-white font-semibold rounded-full shadow-lg border border-fuchsia-400 flex items-center"
                            >
                                <Calendar className="w-5 h-5 mr-2" />
                                Book Your Care
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium mb-4">OUR CARE SERVICES</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Personalized Care for Every Need</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We provide trusted, professional, and verified caregivers for:
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caregivers.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-2xl shadow-lg border border-fuchsia-100 flex flex-col items-center text-center"
                            >
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans & Assurance */}
            <section className="py-16 bg-fuchsia-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold mb-4 text-fuchsia-700">Flexible Plans</h2>
                            <ul className="flex flex-wrap gap-3 mb-8">
                                {plans.map(plan => (
                                    <li key={plan} className="px-4 py-2 bg-fuchsia-100 text-fuchsia-700 rounded-full font-medium text-sm">{plan}</li>
                                ))}
                            </ul>
                            <h2 className="text-2xl font-bold mb-4 text-fuchsia-700">Assurance</h2>
                            <ul className="space-y-2">
                                {assurances.map((item, i) => (
                                    <li key={i} className="flex items-center text-fuchsia-700">
                                        <Star className="w-4 h-4 mr-2 text-fuchsia-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop"
                                alt="Your Care"
                                className="rounded-2xl shadow-xl w-full max-w-xs"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium mb-4">TESTIMONIALS</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Families Say</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Hear from those who trust Your Care for their loved ones
                        </p>
                    </motion.div>
                    <div className="flex flex-wrap gap-8 justify-center">
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-2xl shadow-lg border border-fuchsia-100 max-w-sm flex-1"
                            >
                                <div className="flex items-center mb-4">
                                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-fuchsia-200 mr-4" />
                                    <div>
                                        <h4 className="font-semibold text-fuchsia-700">{t.name}</h4>
                                        <p className="text-xs text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                                <div className="flex mb-2">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="italic text-gray-700">"{t.quote}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Book Now */}
            <section className="py-16 bg-gradient-to-br from-fuchsia-700 to-fuchsia-900 text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 bg-fuchsia-200 text-fuchsia-800 rounded-full text-sm font-medium mb-4">BOOKING</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Flexible, Trusted Care?</h2>
                        <p className="text-xl text-fuchsia-100 max-w-3xl mx-auto">
                            Schedule your Your Care service today for peace of mind and comfort at home.
                        </p>
                    </motion.div>
                    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-fuchsia-100 mb-2 text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-fuchsia-100 mb-2 text-sm font-medium">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                                        placeholder="Your phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-fuchsia-100 mb-2 text-sm font-medium">Care Type</label>
                                    <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400">
                                        <option value="" className="bg-fuchsia-800">Select care type</option>
                                        {caregivers.map(c => (
                                            <option key={c.title} value={c.title} className="bg-fuchsia-800">{c.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-fuchsia-100 mb-2 text-sm font-medium">Preferred Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-fuchsia-100 mb-2 text-sm font-medium">Address</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 h-24 resize-none"
                                    placeholder="Your address"
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold rounded-xl shadow-lg transition-colors flex items-center"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Book Your Care
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-fuchsia-100 mb-2">Prefer to speak with our team?</p>
                        <a
                            href="tel:+918008330905"
                            className="inline-flex items-center text-white font-semibold hover:text-fuchsia-200 transition-colors text-lg"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            +91 8008 330 905
                        </a>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default YourCare;
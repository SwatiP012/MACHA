import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Monitor,
    Laptop,
    CheckCircle,
    Check,
    ArrowLeft,
    Calendar,
    Phone,
    BookOpen,
    GraduationCap,
    Users
} from 'lucide-react';

const OnlineClasses = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate('/book');
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply pt-32">
                <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive Online Classes</h1>
                        <p className="text-xl md:text-2xl mb-8">Quality education delivered to your screen with engaging, interactive learning experiences</p>
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
                                <Calendar className="w-5 h-5 mr-2 inline" /> Book a Class
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Online Classes</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <GraduationCap className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Expert Educators</h3>
                            <p className="text-gray-600">
                                Learn from qualified teachers with extensive experience in their subjects and in online education delivery.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Certified instructors</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Subject matter specialists</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Laptop className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Interactive Platform</h3>
                            <p className="text-gray-600">
                                Our advanced learning platform facilitates real-time interaction, collaborative activities, and engaging multimedia content.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Live video sessions</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Interactive learning tools</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Personalized Learning</h3>
                            <p className="text-gray-600">
                                We adapt teaching methods to different learning styles and provide individualized attention in small group settings.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Small batch sizes</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span>Custom learning paths</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Online Course Categories</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Academic Subjects
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Comprehensive courses covering school and college curriculum across various subjects to help students excel in their academic pursuits.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Mathematics and Sciences</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Languages and Literature</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Social Studies and Humanities</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Test Preparation
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Targeted courses designed to help students prepare for competitive exams, entrance tests, and standardized assessments.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Entrance examination prep</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Competitive exam strategies</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Practice tests and assessments</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Professional Skills
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Develop career-enhancing skills with our professional development courses taught by industry experts.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Programming and IT</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Digital marketing</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Business and management</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <CheckCircle size={22} className="text-green-600 mr-2" /> Creative Arts
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Express your creativity and develop artistic skills through our interactive arts and crafts classes.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Music and instrumental lessons</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Art and drawing classes</span>
                                </li>
                                <li className="flex items-start">
                                    <Check size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>Creative writing workshops</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Age Groups Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Classes for All Age Groups</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-green-600 font-bold text-xl">K-5</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">Elementary</h3>
                            <p className="text-gray-600 text-center">
                                Fun, interactive classes designed for young learners with colorful visuals and engaging activities.
                            </p>
                            <div className="mt-4 text-center">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Ages 5-10</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-green-600 font-bold text-xl">6-8</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">Middle School</h3>
                            <p className="text-gray-600 text-center">
                                Comprehensive curriculum support with emphasis on building strong academic foundations.
                            </p>
                            <div className="mt-4 text-center">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Ages 11-13</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-green-600 font-bold text-xl">9-12</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">High School</h3>
                            <p className="text-gray-600 text-center">
                                Focused academic instruction and exam preparation to help students achieve their goals.
                            </p>
                            <div className="mt-4 text-center">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Ages 14-18</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-green-600 font-bold text-xl">18+</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">Adults</h3>
                            <p className="text-gray-600 text-center">
                                Professional skills development and personal interest courses for continuing education.
                            </p>
                            <div className="mt-4 text-center">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">All adults</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How Our Online Classes Work</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">1</div>
                            <h3 className="text-xl font-semibold mb-3">Enroll in a Course</h3>
                            <p className="text-gray-600">Choose a course that matches your needs and complete the enrollment process.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">2</div>
                            <h3 className="text-xl font-semibold mb-3">Access Platform</h3>
                            <p className="text-gray-600">Receive login details and access our user-friendly online learning platform.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">3</div>
                            <h3 className="text-xl font-semibold mb-3">Attend Classes</h3>
                            <p className="text-gray-600">Join scheduled live sessions or access recorded lessons at your convenience.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">4</div>
                            <h3 className="text-xl font-semibold mb-3">Practice & Feedback</h3>
                            <p className="text-gray-600">Complete assignments and receive personalized feedback to track progress.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Class Packages & Pricing</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                            <div className="p-6 bg-green-50">
                                <h3 className="text-xl font-bold text-green-700 mb-2">Single Class</h3>
                                <div className="text-3xl font-bold text-gray-800 mb-1">₹299<span className="text-sm font-normal text-gray-500">/class</span></div>
                                <div className="text-sm text-gray-500">Pay as you go</div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>1-hour live session</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>24-hour recording access</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>Basic study materials</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Book a Class
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-500">
                            <div className="absolute top-0 w-full text-center">
                                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                                    Most Popular
                                </div>
                            </div>
                            <div className="p-6 bg-green-50 pt-10">
                                <h3 className="text-xl font-bold text-green-700 mb-2">Monthly Package</h3>
                                <div className="text-3xl font-bold text-gray-800 mb-1">₹2,499<span className="text-sm font-normal text-gray-500">/month</span></div>
                                <div className="text-sm text-gray-500">12 classes per month</div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>3 classes per week</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>Full recording access</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>Comprehensive study materials</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>Weekly progress reports</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                            <div className="p-6 bg-green-50">
                                <h3 className="text-xl font-bold text-green-700 mb-2">Term Package</h3>
                                <div className="text-3xl font-bold text-gray-800 mb-1">₹12,999<span className="text-sm font-normal text-gray-500">/6 months</span></div>
                                <div className="text-sm text-gray-500">Save 15% on monthly rate</div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>All Monthly Package benefits</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>Priority scheduling</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>1-on-1 monthly consultation</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        <span>Certification upon completion</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8 text-gray-600">
                        <p>Need a custom package for group or institutional learning? <a href="tel:+918008330905" className="text-green-600 font-medium">Contact us</a> for special rates.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">What equipment do I need for online classes?</h3>
                            <p className="text-gray-600">
                                You'll need a computer, tablet, or smartphone with a stable internet connection. A webcam and microphone are recommended for interactive participation. For some specialized courses, specific software may be required, which will be communicated during enrollment.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Are the classes live or pre-recorded?</h3>
                            <p className="text-gray-600">
                                We offer both live interactive sessions and pre-recorded lessons. Live classes allow real-time interaction with instructors, while recordings provide flexibility to learn at your own pace. Most of our courses include a combination of both formats.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">How many students are in each class?</h3>
                            <p className="text-gray-600">
                                We keep our class sizes small to ensure personalized attention. Most classes have 8-12 students, though this may vary depending on the course type. Some specialized courses or one-on-one tutoring options are also available.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-3">Can I cancel my subscription?</h3>
                            <p className="text-gray-600">
                                Yes, monthly subscriptions can be canceled before the next billing cycle with 7 days' notice. For term packages, we offer partial refunds based on the number of classes already attended. Please refer to our refund policy for more details.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-green-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to start learning?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Enroll in our interactive online classes today and take the next step in your educational journey.
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
                            <BookOpen className="w-5 h-5 mr-2" />
                            Browse Courses
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OnlineClasses;

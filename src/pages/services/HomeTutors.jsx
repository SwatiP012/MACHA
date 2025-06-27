import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    BookOpen,
    GraduationCap,
    CheckCircle,
    Brain,
    Check,
    ArrowLeft,
    Calendar,
    Phone,
    Clock,
    Users,
    Award,
} from "lucide-react";

const HomeTutors = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/book");
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
            {/* Hero Section */}
            <section className="relative py-40 pt-60 bg-gradient-to-b from-green-900 to-green-900 mix-blend-multiply">
                <div className="absolute inset-0 bg-opacity-100 bg-[url('https://imgs.search.brave.com/2bqwvZbnzo3L0jPcnyUa4x8SFWdjjk_ihpPtxQeciUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9yZWFyLXZpZXct/aG9tZS10dXRvci1z/aXR0aW5nLXRhYmxl/LXdpdGgtYm9va3Mt/bnVyc2VyeS1yb29t/LXF1ZXN0aW9uaW5n/LWFmcmljYW4tYW1l/cmljYW5fNjIyMzAx/LTExMjQuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA')] bg-cover bg-center mix-blend-overlay"></div>

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

                <div className="container mx-auto pt-40 px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center text-white"
                    >
                        <h1 className="text-5xl md:text-5xl font-bold mb-4">
                            Home Tutor Services
                        </h1>
                        <p className="text-2xl md:text-2xl mb-8">
                            Personalized education delivered to your doorstep by qualified and
                            experienced tutors
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="tel:+918008330905"
                                className="px-8 py-3 bg-white text-xl text-green-500 font-semibold rounded-full hover:bg-green-50 transition-colors"
                            >
                                <Phone className="w-6 h-6 mr-2 inline" /> Call Now
                            </a>
                            <button
                                onClick={handleBookNow}
                                className="px-8 py-3 bg-green-600 text-xl text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
                            >
                                <Calendar className="w-6 h-6 mr-2 inline" /> Book a Tutor
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-30">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                        Why Choose Our Home Tutors
                    </h2>
                    <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
                        Our personalized tutoring ensures your child receives focused
                        attention, quality instruction, and flexible scheduling for academic
                        success.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
                        {/* Card 1 */}
                        <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                                <img
                                    src="https://media.istockphoto.com/id/921029828/photo/business-man-pointing-the-text-qualified.jpg?s=612x612&w=0&k=20&c=o4Kk0gkFoO-XgWI9oRLnobuHncZE5_HFYta_1rk3I0k="
                                    alt="Qualified Educators"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                    <GraduationCap className="w-7 h-7 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                                Qualified Educators
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Our tutors are highly qualified professionals with degrees in
                                their respective subjects and extensive teaching experience.
                            </p>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-center">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Background-verified tutors
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Subject matter experts
                                </li>
                            </ul>
                        </div>

                        {/* Card 2 */}
                        <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                                <img
                                    src="https://media.istockphoto.com/id/1459334431/photo/one-to-one-with-teacher.jpg?s=612x612&w=0&k=20&c=_UisDK81-Lx9Ci_W2-LCYACJsPCpHp4aowPMd14Spdc="
                                    alt="Personalized Learning"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Users className="w-7 h-7 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                                Personalized Learning
                            </h3>
                            <p className="text-gray-500 mb-4">
                                We customize teaching methods according to each student's
                                learning style, pace, and academic needs.
                            </p>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-center">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Tailogreen lesson plans
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Regular progress tracking
                                </li>
                            </ul>
                        </div>

                        {/* Card 3 */}
                        <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                                <img
                                    src="https://media.istockphoto.com/id/1393498311/vector/project-management-process-to-manage-and-develop-with-resources-to-deliver-quality-product.jpg?s=612x612&w=0&k=20&c=pKJv5ygp5uBinvfyTtynePVA34tFQjo1mypuUjf36Fk="
                                    alt="Flexible Scheduling"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Clock className="w-7 h-7 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                                Flexible Scheduling
                            </h3>
                            <p className="text-gray-500 mb-4">
                                We work around your schedule to provide convenient learning
                                times that fit into your busy lifestyle.
                            </p>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-center">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Evening and weekend options
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Online and in-person sessions
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-12 text-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Tutoring Services
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                                <img
                                    src="https://media.istockphoto.com/id/1034464980/photo/mother-helping-daughter-with-homework.jpg?s=612x612&w=0&k=20&c=ypkpyR_Sry5VZ2wAE8E2Q2qTzMqMY3V-N52VSeD5Ya0="
                                    alt="Academic Tutoring"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <GraduationCap size={24} />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <CheckCircle size={22} className="text-green-600 mr-2" />
                                Academic Tutoring
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Comprehensive tutoring for school and college subjects to
                                improve understanding and grades.
                            </p>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Mathematics and Sciences</span>
                                </li>
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Languages and Literature</span>
                                </li>
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Social Studies and Humanities</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                                <img
                                    src="https://media.istockphoto.com/id/1409994740/photo/mother-gently-correcting-her-sons-homework.jpg?s=612x612&w=0&k=20&c=I1u8mfh9jg_LWawOiU4QHiaCe53AgzIsbBC8C-8F2r4="
                                    alt="Test Preparation"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <BookOpen size={24} />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <CheckCircle size={22} className="text-green-600 mr-2" />
                                Test Preparation
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Strategic preparation for standardized tests and competitive
                                examinations to achieve high scores.
                            </p>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Entrance examinations</span>
                                </li>
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Board exams and school tests</span>
                                </li>
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Competitive exams</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                                <img
                                    src="https://media.istockphoto.com/id/2130335237/photo/skill-development-concept-up-new-ability-skill-for-technology-evolution-employee-thinking.jpg?s=612x612&w=0&k=20&c=WtUMQCoyqO5ZWfQL2Nm_gqB_OHzFDm23wr8yr3ECL0s="
                                    alt="Skill Development"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Award size={24} />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <CheckCircle size={22} className="text-green-600 mr-2" />
                                Skill Development
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Enhance specific skills to excel in academic and professional
                                environments.
                            </p>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Study techniques and time management</span>
                                </li>
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Critical thinking and problem solving</span>
                                </li>
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Communication and writing skills</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                                <img
                                    src="https://media.istockphoto.com/id/1468507973/photo/a-volunteer-communicates-in-sign-language-with-a-deaf-girl-specialized-education-for-disabled.jpg?s=612x612&w=0&k=20&c=JmJmwvEJpyC1WjGgfEPNFL09AQcODjdSBVmaZikoEHs="
                                    alt="Specialized Tutoring"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Brain size={24} />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <CheckCircle size={22} className="text-green-600 mr-2" />
                                Specialized Tutoring
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Targeted assistance for students with specific learning needs or
                                advanced learning goals.
                            </p>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Special education support</span>
                                </li>
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>Gifted student enrichment</span>
                                </li>
                                <li className="flex items-start">
                                    <Check
                                        size={18}
                                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                    />
                                    <span>International curriculum</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-30">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-4 text-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        How Our Tutoring Service Works
                    </motion.h2>

                    <motion.p
                        className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Our step-by-step tutoring process ensures a personalized and
                        effective learning experience tailored to each student's goals.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Assessment",
                                desc: "We evaluate the student's needs, learning style, and academic goals through an initial consultation.",
                                img: "https://media.istockphoto.com/id/1451079337/photo/customer-review-good-rating-concept-hand-pressing-user-and-five-star-icon-on-visual-screen.jpg?s=612x612&w=0&k=20&c=KftvGEGrkQRLO_dqRyHmMW0EDFraAOjD9lrpMKpQR1w=",
                            },
                            {
                                title: "Tutor Matching",
                                desc: "We pair the student with a compatible tutor specializing in the required subject areas.",
                                img: "https://media.istockphoto.com/id/1387959076/photo/speech-training-for-kids-professional-woman-training-with-little-boy-at-cabinet-teaching.jpg?s=612x612&w=0&k=20&c=gfrvuJtfnazq7HoYN2nTfoao2EAh3JoNyT5afsxOPrs=",
                            },
                            {
                                title: "Personalized Plan",
                                desc: "The tutor develops a customized learning plan tailored to the student's specific requirements.",
                                img: "https://media.istockphoto.com/id/1185407367/photo/prepaid-tuition-plan-and-papers-with-pan-loan-for-education-concept.jpg?s=612x612&w=0&k=20&c=T8eiuyo_C4bhHf1G26pCZ24FM9kAoOE479050_eUDAY=",
                            },
                            {
                                title: "Regular Sessions",
                                desc: "Scheduled tutoring sessions with ongoing progress reports and plan adjustments as needed.",
                                img: "https://media.istockphoto.com/id/539991020/photo/studying-at-home.jpg?s=612x612&w=0&k=20&c=hM3D5X86gh_Ts0DeGUuaw-p9hRh7EZE_XkI0GfyLFtQ=",
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                        <img
                                            src={step.img}
                                            alt={`Step ${index + 1}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                        />
                                    </div>
                                </div>

                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                                    {index + 1}
                                </div>

                                <h3 className="font-semibold text-2xl mb-3 text-gray-800">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-base">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-6xl mx-auto flex flex-col gap-8">
                        {[
                            {
                                q: "How are your tutors selected and vetted?",
                                a: "Our tutors undergo a rigorous selection process including subject knowledge tests, background verification, and teaching demonstration. We only hire tutors with relevant qualifications and experience in their subject areas.",
                            },
                            {
                                q: "What age groups do you cater to?",
                                a: "We provide tutoring services for students of all ages, from elementary school to college and adult learners. Our tutors are specialized in teaching specific age groups and educational levels.",
                            },
                            {
                                q: "Can I request a different tutor if I'm not satisfied?",
                                a: "Absolutely. We want to ensure the best learning experience, so if you're not completely satisfied with your assigned tutor, we'll gladly arrange a replacement at no additional cost.",
                            },
                            {
                                q: "Do you offer online tutoring options?",
                                a: "Yes, we provide both in-person and online tutoring options. Our online platform is interactive and user-friendly, allowing for seamless virtual learning with the same personalized approach as in-person sessions.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex flex-col md:flex-row items-center md:items-start group ${i % 2 === 0 ? "" : "md:flex-row-reverse"
                                    }`}
                            >
                                <div className="md:w-1/5 w-full flex justify-center mb-4 md:mb-0">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                        <span className="text-white text-3xl font-bold">
                                            {i + 1}
                                        </span>
                                    </div>
                                </div>
                                <div className="md:w-4/5 w-full">
                                    <div
                                        className={`bg-white px-14 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${i % 2 === 0
                                                ? "border-l-8 border-green-500"
                                                : "border-r-8 border-green-500"
                                            }`}
                                    >
                                        <h3 className="text-2xl font-bold mb-3 flex items-center text-gray-800">
                                            <span className="text-gray-500 mr-3">
                                                <svg
                                                    className="w-8 h-8"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </span>
                                            {item.q}
                                        </h3>
                                        <p className="text-gray-600 text-lg pl-12">{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-gray-30">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            {/* Text Section */}
                            <div className="md:w-2/3 mb-8 md:mb-0">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Ready to boost academic performance?
                                </h2>
                                <p className="text-green-100 text-lg mb-0">
                                    Contact us today to schedule an assessment and start your
                                    journey toward academic excellence with our expert tutors.
                                </p>
                            </div>

                            {/* Buttons Section */}
                            <div className="md:w-2/3 flex flex-col md:items-end gap-4">
                                <a
                                    href="tel:+918008330905"
                                    className="px-6 py-3 text-lg bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                                >
                                    <Phone className="w-6 h-6 mr-2 inline" /> Call Now: +91 8008
                                    330 905
                                </a>
                                <button
                                    onClick={handleBookNow}
                                    className="px-6 py-3 text-lg bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 border border-white border-opacity-25 transition-colors shadow-md"
                                >
                                    <Calendar className="w-6 h-6 mr-2 inline" /> Book a Tutor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeTutors;

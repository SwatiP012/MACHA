import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceDetailsModal = ({ service, serviceDetails, onClose }) => {
    const navigate = useNavigate();

    if (!service) return null;

    const details = serviceDetails[service.name] || {};

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative"
                    initial={{ scale: 0.95, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 40 }}
                >
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16">{service.icon}</div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                <Star size={16} className="text-purple-600 mr-1" />
                                {details.rating || 4.5}
                                <span className="ml-1">({details.reviews || "1K"} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-lg font-semibold mb-2 text-gray-800">
                        ₹{details.price || 500}
                        {details.oldPrice && (
                            <span className="line-through text-gray-400 text-base font-normal">
                                ₹{details.oldPrice}
                            </span>
                        )}
                        <span className="text-gray-600 font-normal flex items-center">
                            <Clock size={16} className="mr-1" />
                            {details.duration || "1 hr"}
                        </span>
                    </div>
                    <div className="text-green-600 text-sm mb-4">
                        {details.perUnit}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Included</h3>
                        <ul className="space-y-2">
                            {(details.included || []).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="mt-1 text-green-500">•</span>
                                    <div>
                                        <div className="font-medium text-gray-700">{item.title}</div>
                                        <div className="text-gray-600 text-sm">{item.desc}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                            onClick={() => {
                                onClose();
                                navigate('/book', { state: { serviceType: service.name } });
                            }}
                        >
                            Book Now
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ServiceDetailsModal;
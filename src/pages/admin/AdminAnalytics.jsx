import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {
    Users,
    Package,
    Calendar,
    MessageSquare
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const statBoxClass =
    "flex flex-col justify-between bg-white rounded-xl shadow-md p-5 min-w-[220px] min-h-[110px] gap-2 border border-gray-100 hover:shadow-lg transition-shadow";
const iconBoxClass = "flex items-center justify-center w-10 h-10 rounded-lg";

const AdminAnalytics = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/analytics/monthly-stats`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setStats(res.data.months || []);
            } catch (err) {
                setError('Failed to load analytics data.');
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    // Prepare data for cards and chart
    const totalUsers = stats.reduce((sum, m) => sum + m.users, 0);
    const totalOrders = stats.reduce((sum, m) => sum + m.orders, 0);
    const totalBookings = stats.reduce((sum, m) => sum + m.bookings, 0);
    const totalMessages = stats.reduce((sum, m) => sum + m.messages, 0);

    // Chart data
    const chartData = {
        labels: stats.map((m) => m.month),
        datasets: [
            {
                label: 'Users',
                data: stats.map((m) => m.users),
                backgroundColor: '#3b82f6',
            },
            {
                label: 'Orders',
                data: stats.map((m) => m.orders),
                backgroundColor: '#10b981',
            },
            {
                label: 'Bookings',
                data: stats.map((m) => m.bookings),
                backgroundColor: '#8b5cf6',
            },
            {
                label: 'Messages',
                data: stats.map((m) => m.messages),
                backgroundColor: '#ec4899',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 14, weight: 'bold' },
                    color: '#374151'
                }
            },
            title: {
                display: true,
                text: 'Monthly Business Metrics',
                font: { size: 20, weight: 'bold' },
                color: '#111827'
            },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#111827',
                bodyColor: '#374151',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                caretPadding: 8,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#6b7280', font: { size: 13 } }
            },
            y: {
                grid: { color: '#e5e7eb' },
                beginAtZero: true,
                ticks: { color: '#6b7280', font: { size: 13 }, stepSize: 1 }
            }
        }
    };

    return (
        <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
            <h2 className="text-3xl text-black font-bold mb-8">Analytics Dashboard</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    {/* Stat Cards with colored icon backgrounds */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-10">
                        <div className={statBoxClass}>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-gray-600 font-medium">Total Users</span>
                                <span className={`${iconBoxClass} bg-blue-500`}>
                                    <Users className="text-white" size={24} />
                                </span>
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{totalUsers}</span>
                        </div>
                        <div className={statBoxClass}>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-gray-600 font-medium">Total Orders</span>
                                <span className={`${iconBoxClass} bg-green-500`}>
                                    <Package className="text-white" size={24} />
                                </span>
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{totalOrders}</span>
                        </div>
                        <div className={statBoxClass}>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-gray-600 font-medium">Total Bookings</span>
                                <span className={`${iconBoxClass} bg-indigo-500`}>
                                    <Calendar className="text-white" size={24} />
                                </span>
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{totalBookings}</span>
                        </div>
                        <div className={statBoxClass}>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-gray-600 font-medium">Messages</span>
                                <span className={`${iconBoxClass} bg-pink-500`}>
                                    <MessageSquare className="text-white" size={24} />
                                </span>
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{totalMessages}</span>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-10 border border-gray-100">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminAnalytics;
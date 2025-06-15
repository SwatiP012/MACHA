import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Filter, ArrowRight, X, Star, Clock
} from 'lucide-react';

// Service details for modal or future use
const serviceDetails = {
  "Food Delivery": {
    rating: 4.8,
    reviews: "1.2M",
    price: 299,
    oldPrice: 399,
    duration: "45 min",
    perUnit: "per order",
    included: [
      { title: "Fast delivery", desc: "Get your food delivered hot and fresh." },
      { title: "Multiple cuisines", desc: "Choose from a variety of restaurants." }
    ]
  },
  "Grocery Delivery": {
    rating: 4.7,
    reviews: "900K",
    price: 199,
    oldPrice: 249,
    duration: "1 hr",
    perUnit: "per order",
    included: [
      { title: "Fresh groceries", desc: "Daily essentials delivered to your door." },
      { title: "Scheduled delivery", desc: "Choose your preferred delivery slot." }
    ]
  },
  "Organic Products": {
    rating: 4.9,
    reviews: "500K",
    price: 399,
    oldPrice: 499,
    duration: "2 hrs",
    perUnit: "per box",
    included: [
      { title: "Certified organic", desc: "Sourced from trusted local farms." },
      { title: "Seasonal produce", desc: "Enjoy the freshest fruits and veggies." }
    ]
  },
  "Medicine Delivery": {
    rating: 4.85,
    reviews: "800K",
    price: 150,
    oldPrice: 200,
    duration: "30 min",
    perUnit: "per order",
    included: [
      { title: "Prescription pickup", desc: "Upload your prescription for quick delivery." },
      { title: "Wide range", desc: "All major medicines and brands available." }
    ]
  },
  "Electrician": {
    rating: 4.75,
    reviews: "600K",
    price: 299,
    oldPrice: 399,
    duration: "1 hr",
    perUnit: "per visit",
    included: [
      { title: "Wiring & repairs", desc: "All types of electrical work handled." },
      { title: "Quick response", desc: "Same-day service available." }
    ]
  },
  "Plumber": {
    rating: 4.7,
    reviews: "500K",
    price: 349,
    oldPrice: 449,
    duration: "1 hr",
    perUnit: "per visit",
    included: [
      { title: "Leak repairs", desc: "Fixing leaks, taps, and pipes." },
      { title: "Installations", desc: "Fittings for bathrooms and kitchens." }
    ]
  },
  "Carpenter": {
    rating: 4.8,
    reviews: "300K",
    price: 399,
    oldPrice: 499,
    duration: "2 hrs",
    perUnit: "per visit",
    included: [
      { title: "Furniture repair", desc: "All types of woodwork and repairs." },
      { title: "Custom work", desc: "Shelves, cabinets, and more." }
    ]
  },
  "AC Technician": {
    rating: 4.9,
    reviews: "250K",
    price: 499,
    oldPrice: 599,
    duration: "1.5 hrs",
    perUnit: "per AC",
    included: [
      { title: "Servicing", desc: "AC cleaning and maintenance." },
      { title: "Repairs", desc: "Gas filling, part replacement." }
    ]
  },
  "Transport Services": {
    rating: 4.6,
    reviews: "200K",
    price: 599,
    oldPrice: 799,
    duration: "Varies",
    perUnit: "per trip",
    included: [
      { title: "Vehicle rental", desc: "Cars, bikes, and vans available." },
      { title: "Logistics", desc: "Goods transport and shifting." }
    ]
  },
  "Security Services": {
    rating: 4.8,
    reviews: "150K",
    price: 999,
    oldPrice: 1200,
    duration: "8 hrs",
    perUnit: "per guard",
    included: [
      { title: "Trained guards", desc: "Background-checked and experienced." },
      { title: "Flexible shifts", desc: "Day/night security available." }
    ]
  },
  "Sanitization": {
    rating: 4.85,
    reviews: "180K",
    price: 499,
    oldPrice: 599,
    duration: "2 hrs",
    perUnit: "per 1000 sq.ft.",
    included: [
      { title: "Hospital-grade chemicals", desc: "Safe for kids and pets." },
      { title: "Full coverage", desc: "Home, office, and vehicles." }
    ]
  },
  "Event Management": {
    rating: 4.9,
    reviews: "90K",
    price: 4999,
    oldPrice: 5999,
    duration: "Varies",
    perUnit: "per event",
    included: [
      { title: "Planning", desc: "End-to-end event planning." },
      { title: "Execution", desc: "Decor, catering, and more." }
    ]
  },
  "Digital Marketing": {
    rating: 4.8,
    reviews: "120K",
    price: 2999,
    oldPrice: 3999,
    duration: "1 month",
    perUnit: "per campaign",
    included: [
      { title: "Social media", desc: "Facebook, Instagram, Google Ads." },
      { title: "Content creation", desc: "Posts, videos, and blogs." }
    ]
  },
  "Home Tutors": {
    rating: 4.85,
    reviews: "200K",
    price: 499,
    oldPrice: 599,
    duration: "1 hr",
    perUnit: "per session",
    included: [
      { title: "Qualified tutors", desc: "All subjects and grades." },
      { title: "Flexible timing", desc: "Home and online options." }
    ]
  },
  "Medical Services": {
    rating: 4.9,
    reviews: "80K",
    price: 299,
    oldPrice: 399,
    duration: "30 min",
    perUnit: "per visit",
    included: [
      { title: "Sample collection", desc: "At-home blood and urine tests." },
      { title: "Doctor consult", desc: "Book appointments easily." }
    ]
  },
  "Software Development": {
    rating: 4.95,
    reviews: "50K",
    price: 9999,
    oldPrice: 12000,
    duration: "Varies",
    perUnit: "per project",
    included: [
      { title: "Web & mobile", desc: "Custom websites and apps." },
      { title: "Maintenance", desc: "Ongoing support available." }
    ]
  },
  "Home Keeping ": {
    rating: 4.8,
    reviews: "300K",
    price: 799,
    oldPrice: 999,
    duration: "3 hrs",
    perUnit: "per visit",
    included: [
      { title: "Deep cleaning", desc: "All rooms, kitchen, and bathrooms." },
      { title: "Eco-friendly", desc: "Safe cleaning products." }
    ]
  },
  "Online Classes": {
    rating: 4.7,
    reviews: "100K",
    price: 299,
    oldPrice: 399,
    duration: "1 hr",
    perUnit: "per class",
    included: [
      { title: "Live sessions", desc: "Interactive and engaging." },
      { title: "All subjects", desc: "Academic and hobby classes." }
    ]
  },
  "Lunch Box Supply": {
    rating: 4.8,
    reviews: "60K",
    price: 99,
    oldPrice: 120,
    duration: "Daily",
    perUnit: "per box",
    included: [
      { title: "Fresh meals", desc: "Hygienic and tasty." },
      { title: "Customizable", desc: "Veg and non-veg options." }
    ]
  },
  "Fruit box Supply": {
    rating: 4.85,
    reviews: "40K",
    price: 149,
    oldPrice: 180,
    duration: "Daily",
    perUnit: "per box",
    included: [
      { title: "Seasonal fruits", desc: "Handpicked and fresh." },
      { title: "Doorstep delivery", desc: "On time, every time." }
    ]
  },
  "House Rental": {
    rating: 4.7,
    reviews: "30K",
    price: 5000,
    oldPrice: 6000,
    duration: "Monthly",
    perUnit: "per house",
    included: [
      { title: "Verified listings", desc: "Safe and secure homes." },
      { title: "Support", desc: "Help with agreements and moving." }
    ]
  },
  "Packers and Movers": {
    rating: 4.8,
    reviews: "70K",
    price: 2999,
    oldPrice: 3500,
    duration: "Varies",
    perUnit: "per move",
    included: [
      { title: "Packing", desc: "Safe and secure packing." },
      { title: "Transport", desc: "Timely and insured delivery." }
    ]
  }
};

// Custom icon components for each service
const CustomIcons = {
  FoodDelivery: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    </div>
  ),
  Groceries: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    </div>
  ),
  Organic: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-emerald-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 3v12a3 3 0 1 0 6 0V3"></path>
        <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
        <path d="M18 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
      </svg>
    </div>
  ),
  Electrician: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-yellow-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.5 8.5L19 4l-1-1-4.5 4.5"></path>
        <path d="m9 15-4.5 4.5 1 1L10 16"></path>
        <path d="M15 5 5 15"></path>
        <path d="M18.5 2.5 21 5 5 21 2.5 18.5"></path>
      </svg>
    </div>
  ),
  Plumber: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2v4"></path>
        <path d="M4 8h16"></path>
        <path d="M8 8v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8"></path>
        <path d="M10 15h4"></path>
      </svg>
    </div>
  ),
  Carpenter: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-amber-600 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path>
        <path d="M17.64 15 22 10.64"></path>
        <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path>
      </svg>
    </div>
  ),
  ACTechnician: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-cyan-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9.5 7.5V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3.5"></path>
        <path d="M4 7.5a2.5 2.5 0 0 1 5 0"></path>
        <path d="M20 7.5a2.5 2.5 0 0 0-5 0"></path>
        <path d="M12 7v13"></path>
        <path d="M10 12H2"></path>
        <path d="M22 12h-8"></path>
      </svg>
    </div>
  ),
  Transport: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M5 17h14"></path>
        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <path d="M8 2h8"></path>
        <path d="M8 7V2"></path>
        <path d="M16 7V2"></path>
      </svg>
    </div>
  ),
  Security: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-purple-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    </div>
  ),
  Sanitization: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-400 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4.93 19.07A10 10 0 0 1 2 12C2 6.5 6.5 2 12 2s10 4.5 10 10c0 2.75-1.1 5.25-2.93 7.07"></path>
        <path d="M9 15h6"></path>
        <path d="M9.5 9l5 3-5 3z"></path>
      </svg>
    </div>
  ),
  Events: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-pink-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
      </svg>
    </div>
  ),
  Marketing: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-rose-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    </div>
  ),
  HomeTutors: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-red-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m2 7 8-5 8 5"></path>
        <path d="M10 20.5 2 16V8"></path>
        <path d="m14 20.5 8-4.5V8"></path>
        <path d="M10 20.5v-9L18 8"></path>
        <path d="M6 11.5 10 14"></path>
      </svg>
    </div>
  ),
  Medical: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-sky-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M7 20h10"></path>
        <path d="M10 17v3"></path>
        <path d="M14 17v3"></path>
        <path d="M5 11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"></path>
        <path d="M9 9V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
        <path d="M12 12h.01"></path>
      </svg>
    </div>
  ),
  Software: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"></path>
        <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"></path>
        <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"></path>
      </svg>
    </div>
  ),
  Cleaning: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-teal-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 11v11"></path>
        <path d="M21 22V9a5 5 0 0 0-5-5H8a5 5 0 0 0-4 2"></path>
        <path d="M12 7v13"></path>
        <path d="m8 2 4 4 4-4"></path>
      </svg>
    </div>
  ),
  OnlineClasses: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-400 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="16" height="12" x="4" y="2" rx="2"></rect>
        <rect width="8" height="8" x="8" y="14" rx="2"></rect>
        <path d="M13 14v-4"></path>
        <path d="M8 22h8"></path>
      </svg>
    </div>
  ),
  Medicine: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-pink-400 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m19 5-7 7-7-7"></path>
        <path d="M12 19V12"></path>
      </svg>
    </div>
  ),
  LunchBox: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-lime-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="2" />
        <path d="M7 7V5a5 5 0 0 1 10 0v2" strokeWidth="2" />
      </svg>
    </div>
  ),
  FruitBox: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-700 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <circle cx="12" cy="12" r="8" strokeWidth="2" />
        <path d="M8 12a4 4 0 0 1 8 0" strokeWidth="2" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    </div>
  ),
};

// Service categories
const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'delivery', name: 'Delivery', count: 4 },
  { id: 'technicians', name: 'Technicians', count: 4 },
  { id: 'events', name: 'Events', count: 1 },
  { id: 'health', name: 'Health', count: 2 },
  { id: 'education', name: 'Education', count: 2 },
  { id: 'digital', name: 'Digital', count: 2 },
  { id: 'home', name: 'Home Services', count: 3 },
];

// Services array
const services = [
  {
    id: 1,
    name: 'Food Delivery',
    category: 'delivery',
    icon: <CustomIcons.FoodDelivery />,
    description: 'Get food delivered from local restaurants',
    color: 'text-orange-500',
    bgLight: 'bg-orange-50'
  },
  {
    id: 2,
    name: 'Grocery Delivery',
    category: 'delivery',
    icon: <CustomIcons.Groceries />,
    description: 'Daily essentials at your doorstep',
    color: 'text-green-500',
    bgLight: 'bg-green-50'
  },
  {
    id: 3,
    name: 'Organic Products',
    category: 'delivery',
    icon: <CustomIcons.Organic />,
    description: 'Fresh organic produce from local farms',
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-50'
  },
  {
    id: 4,
    name: 'Medicine Delivery',
    category: 'delivery',
    icon: <CustomIcons.Medicine />,
    description: 'Quick delivery of medicines',
    color: 'text-pink-400',
    bgLight: 'bg-pink-50'
  },
  {
    id: 5,
    name: 'Electrician',
    category: 'technicians',
    icon: <CustomIcons.Electrician />,
    description: 'Professional electrical repair and installation',
    color: 'text-yellow-500',
    bgLight: 'bg-yellow-50'
  },
  {
    id: 6,
    name: 'Plumber',
    category: 'technicians',
    icon: <CustomIcons.Plumber />,
    description: 'Expert plumbers for all water issues',
    color: 'text-blue-500',
    bgLight: 'bg-blue-50'
  },
  {
    id: 7,
    name: 'Carpenter',
    category: 'technicians',
    icon: <CustomIcons.Carpenter />,
    description: 'Skilled furniture repair and creation',
    color: 'text-amber-600',
    bgLight: 'bg-amber-50'
  },
  {
    id: 8,
    name: 'AC Technician',
    category: 'technicians',
    icon: <CustomIcons.ACTechnician />,
    description: 'AC servicing and repair experts',
    color: 'text-cyan-500',
    bgLight: 'bg-cyan-50'
  },
  {
    id: 9,
    name: 'Transport Services',
    category: 'delivery',
    icon: <CustomIcons.Transport />,
    description: 'Vehicle rentals and logistics solutions',
    color: 'text-indigo-500',
    bgLight: 'bg-indigo-50'
  },
  {
    id: 10,
    name: 'Security Services',
    category: 'home',
    icon: <CustomIcons.Security />,
    description: 'Reliable security guards services',
    color: 'text-purple-500',
    bgLight: 'bg-purple-50'
  },
  {
    id: 11,
    name: 'Sanitization',
    category: 'health',
    icon: <CustomIcons.Sanitization />,
    description: 'Professional home and office sanitization',
    color: 'text-green-400',
    bgLight: 'bg-green-50'
  },
  {
    id: 12,
    name: 'Event Management',
    category: 'events',
    icon: <CustomIcons.Events />,
    description: 'Complete event planning services',
    color: 'text-pink-500',
    bgLight: 'bg-pink-50'
  },
  {
    id: 13,
    name: 'Digital Marketing',
    category: 'digital',
    icon: <CustomIcons.Marketing />,
    description: 'Social media management and advertising',
    color: 'text-rose-500',
    bgLight: 'bg-rose-50'
  },
  {
    id: 14,
    name: 'Home Tutors',
    category: 'education',
    icon: <CustomIcons.HomeTutors />,
    description: 'Qualified tutors for all subjects',
    color: 'text-red-500',
    bgLight: 'bg-red-50'
  },
  {
    id: 15,
    name: 'Medical Services',
    category: 'health',
    icon: <CustomIcons.Medical />,
    description: 'Lab sample collection and appointments',
    color: 'text-sky-500',
    bgLight: 'bg-sky-50'
  },
  {
    id: 16,
    name: 'Software Development',
    category: 'digital',
    icon: <CustomIcons.Software />,
    description: 'Custom websites and app development',
    color: 'text-violet-500',
    bgLight: 'bg-violet-50'
  },
  {
    id: 17,
    name: 'Home Keeping ',
    category: 'home',
    icon: <CustomIcons.Cleaning />,
    description: 'Professional home cleaning',
    color: 'text-teal-500',
    bgLight: 'bg-teal-50'
  },
  {
    id: 18,
    name: 'Online Classes',
    category: 'education',
    icon: <CustomIcons.OnlineClasses />,
    description: 'Virtual classes for all age groups',
    color: 'text-orange-400',
    bgLight: 'bg-orange-50'
  },
  {
    id: 19,
    name: 'Lunch Box Supply',
    category: 'delivery',
    icon: <CustomIcons.LunchBox />,
    description: 'Fresh and hygienic lunch boxes delivered to your location',
    color: 'text-lime-500',
    bgLight: 'bg-lime-50'
  },
  {
    id: 20,
    name: 'Fruit box Supply',
    category: 'delivery',
    icon: <CustomIcons.FruitBox />,
    description: 'Nutritious fruit boxes delivered daily',
    color: 'text-green-700',
    bgLight: 'bg-green-50'
  },
  {
    id: 21,
    name: 'House Rental',
    category: 'home',
    icon: (
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-400 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="M3 10.5L12 4l9 6.5" strokeWidth="2" />
          <rect x="6" y="14" width="12" height="6" rx="2" strokeWidth="2" />
          <path d="M9 20v-4h6v4" strokeWidth="2" />
        </svg>
      </div>
    ),
    description: 'Find rental houses and flats in your area',
    color: 'text-blue-400',
    bgLight: 'bg-blue-50'
  },
  {
    id: 22,
    name: 'Packers and Movers',
    category: 'home',
    icon: (
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-yellow-600 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="2" />
          <path d="M16 3v4M8 3v4" strokeWidth="2" />
          <path d="M3 10h18" strokeWidth="2" />
        </svg>
      </div>
    ),
    description: 'Professional packing and moving services',
    color: 'text-yellow-600',
    bgLight: 'bg-yellow-50'
  },
];

const ServiceFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredServices, setFilteredServices] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const searchRef = useRef(null);
  const filterRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Initialize filteredServices on component mount
  useEffect(() => {
    setFilteredServices(services);
  }, []);

  // Update filteredServices when filters change
  useEffect(() => {
    filterServices();
  }, [searchTerm, selectedCategory]);

  const filterServices = () => {
    let results = [...services];
    if (selectedCategory !== 'all') {
      results = results.filter(service => service.category === selectedCategory);
    }
    if (searchTerm.trim() !== '') {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        service => service.name.toLowerCase().includes(searchTermLower) ||
          service.description.toLowerCase().includes(searchTermLower)
      );
    }
    setFilteredServices(results);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium inline-block mb-4">
            OUR EXPERTISE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600"> Services We Offer</span>
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find and filter through our comprehensive range of services for all your needs
          </p>
        </motion.div>

        {/* Search and filter controls */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black">
                <Search size={18} />
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full h-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-100 text-black placeholder:text-gray-400"
                aria-label="Search services"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex-shrink-0 w-full md:w-1/3">
              <div className="relative h-full">
                <select
                  id="category-filters"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-full pl-3 pr-8 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-100 text-black appearance-none"
                  aria-label="Filter services by category"
                >
                  {serviceCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} {category.count ? `(${category.count})` : ''}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile filter button */}
          <div className="md:hidden mt-4" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700"
              aria-expanded={isFilterOpen}
              aria-controls="mobile-filters"
            >
              <Filter size={18} />
              <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isFilterOpen ? 'auto' : 0,
                opacity: isFilterOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div id="mobile-filters" className="mt-3 p-4 rounded-lg bg-white border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {serviceCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === category.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Show filter tags on desktop */}
          <div className="hidden md:flex flex-wrap gap-2 mt-6 justify-center">
            {serviceCategories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === category.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Service cards */}
        {filteredServices.length > 0 ? (
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-5 h-full border border-gray-200 hover:border-green-300 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4 mb-3">
                    {service.icon}
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 mt-1">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                    <span className="text-xs py-1 px-2.5 rounded-full bg-gray-100 text-gray-600">
                      {serviceCategories.find(cat => cat.id === service.category)?.name}
                    </span>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      View Details
                      <ArrowRight size={14} className="ml-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 rounded-xl bg-white border border-gray-200 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4 mx-auto">
              <Search size={20} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any services matching your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Details Modal */}
        <AnimatePresence>
          {selectedService && (
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
                  onClick={() => setSelectedService(null)}
                >
                  <X size={24} />
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16">{selectedService.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedService.name}</h2> {/* <-- changed */}
                    <div className="flex items-center text-sm text-gray-600 mt-1"> {/* <-- changed */}
                      <Star size={16} className="text-purple-600 mr-1" />
                      {serviceDetails[selectedService.name]?.rating || 4.5}
                      <span className="ml-1">({serviceDetails[selectedService.name]?.reviews || "1K"} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-lg font-semibold mb-2 text-gray-800"> {/* <-- changed */}
                  ₹{serviceDetails[selectedService.name]?.price || 500}
                  {serviceDetails[selectedService.name]?.oldPrice && (
                    <span className="line-through text-gray-400 text-base font-normal">
                      ₹{serviceDetails[selectedService.name].oldPrice}
                    </span>
                  )}
                  <span className="text-gray-600 font-normal flex items-center"> {/* <-- changed */}
                    <Clock size={16} className="mr-1" />
                    {serviceDetails[selectedService.name]?.duration || "1 hr"}
                  </span>
                </div>
                <div className="text-green-600 text-sm mb-4">
                  {serviceDetails[selectedService.name]?.perUnit}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Included</h3> {/* <-- changed */}
                  <ul className="space-y-2">
                    {(serviceDetails[selectedService.name]?.included || []).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 text-green-500">•</span>
                        <div>
                          <div className="font-medium text-gray-700">{item.title}</div> {/* <-- changed */}
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
                      setSelectedService(null);
                      navigate('/book', { state: { serviceType: selectedService.name } });
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="text-center mt-12">
          <Link
            to="/book"
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
          >
            Book a Custom Service
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div >
    </section >
  );
};

export default ServiceFilter;
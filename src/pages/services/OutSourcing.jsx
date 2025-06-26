import React from "react";

export default function OutsourcingDetails() {
    return (
        <section className="py-16 bg-white min-h-screen">
            <div className="container mx-auto max-w-3xl px-4">
                <div className="mb-8 flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-blue-700 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                            <path d="M9 17v-2a4 4 0 0 1 8 0v2" strokeWidth="2" />
                            <circle cx="13" cy="7" r="4" strokeWidth="2" />
                            <rect x="2" y="17" width="20" height="5" rx="2" strokeWidth="2" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-blue-800">Outsourcing Services</h1>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop"
                    alt="Outsourcing"
                    className="rounded-xl mb-8 w-full object-cover"
                />
                <div className="prose max-w-none text-gray-700">
                    <p>
                        <strong>Outsourcing services</strong> refer to the practice of hiring external third-party providers to handle specific business functions, operations, or processes instead of managing them in-house.
                    </p>
                    <ul>
                        <li>Reduce operational costs</li>
                        <li>Improve efficiency and productivity</li>
                        <li>Focus on core business activities</li>
                        <li>Access to specialized expertise</li>
                        <li>Scalable and flexible solutions</li>
                    </ul>
                    <p>
                        Companies outsource a variety of functions such as IT, customer support, HR, accounting, marketing, and more. Our outsourcing solutions are tailored to your business needs, ensuring quality, reliability, and confidentiality.
                    </p>
                </div>
                <div className="mt-10">
                    <a
                        href="/book"
                        className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                    >
                        Book Outsourcing Service
                    </a>
                </div>
            </div>
        </section>
    );
}

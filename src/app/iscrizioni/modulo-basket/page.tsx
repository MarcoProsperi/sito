"use client";

import RegistrationForm from '@/components/RegistrationForm';

export default function RegistrationBasketPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Minimal Background for the page */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('/images/logo.png')] bg-center bg-no-repeat bg-[length:50vh]"></div>
            </div>

            <div className="relative z-10">
                <RegistrationForm type="basket" />
            </div>

            <footer className="max-w-4xl mx-auto py-8 text-center text-gray-400 text-xs px-4">
                <p>Copyright © {new Date().getFullYear()} Virtus Velletri Basket. Tutti i diritti riservati.</p>
                <p className="mt-2 italic">Per assistenza nella compilazione: segreteria.virtusvelletri@gmail.com</p>
            </footer>

            {/* CSS to ensure perfect print result */}
            <style jsx global>{`
                @media print {
                    body {
                        background: white !important;
                        margin: 0;
                        padding: 0;
                    }
                    .fixed, footer, nav {
                        display: none !important;
                    }
                    main, .relative {
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}

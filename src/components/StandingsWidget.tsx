"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dati di esempio per le classifiche
const standingsData = [
    {
        category: "Serie C Silver",
        rows: [
            { rank: 1, team: "Virtus Velletri", points: 24, played: 12, won: 12, lost: 0 },
            { rank: 2, team: "Basket Roma", points: 20, played: 12, won: 10, lost: 2 },
            { rank: 3, team: "Alfa Omega", points: 18, played: 12, won: 9, lost: 3 },
            { rank: 4, team: "Carver Cinecittà", points: 14, played: 12, won: 7, lost: 5 },
            { rank: 5, team: "San Nilo", points: 12, played: 12, won: 6, lost: 6 },
            { rank: 6, team: "Basket Frascati", points: 10, played: 12, won: 5, lost: 7 },
            { rank: 7, team: "Genzano Basket", points: 8, played: 12, won: 4, lost: 8 },
        ]
    },
    {
        category: "Under 19 Gold",
        rows: [
            { rank: 1, team: "Smyrna Basket", points: 22, played: 11, won: 11, lost: 0 },
            { rank: 2, team: "Virtus Velletri", points: 20, played: 12, won: 10, lost: 2 },
            { rank: 3, team: "DBS Roma", points: 16, played: 11, won: 8, lost: 3 },
            { rank: 4, team: "Anzio Basket", points: 12, played: 11, won: 6, lost: 5 },
            { rank: 5, team: "Fonte Roma", points: 10, played: 11, won: 5, lost: 6 },
            { rank: 6, team: "Basket Nettuno", points: 8, played: 11, won: 4, lost: 7 },
            { rank: 7, team: "Aprilia Basket", points: 6, played: 11, won: 3, lost: 8 },
        ]
    },
    {
        category: "Under 17 Eccellenza",
        rows: [
            { rank: 1, team: "Stella Azzurra", points: 24, played: 12, won: 12, lost: 0 },
            { rank: 2, team: "HSC Roma", points: 20, played: 12, won: 10, lost: 2 },
            { rank: 3, team: "Virtus Velletri", points: 16, played: 12, won: 8, lost: 4 },
            { rank: 4, team: "Eurobasket", points: 14, played: 12, won: 7, lost: 5 },
            { rank: 5, team: "Tiber Basket", points: 10, played: 12, won: 5, lost: 7 },
            { rank: 6, team: "Basket Latina", points: 8, played: 12, won: 4, lost: 8 },
            { rank: 7, team: "Colleferro Basket", points: 6, played: 12, won: 3, lost: 9 },
        ]
    }
];

export default function StandingsWidget() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotazione ogni 5 secondi
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % standingsData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + standingsData.length) % standingsData.length);
    };

    const currentStandings = standingsData[currentIndex];

    return (
        <section className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            {/* Header con controlli */}
            <div className="bg-virtus-blue p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-virtus-yellow" />
                    <h3 className="text-xl font-display font-bold uppercase tracking-tight">
                        Classifiche
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prevSlide}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-bold w-32 text-center text-virtus-yellow">
                        {currentStandings.category}
                    </span>
                    <button
                        onClick={nextSlide}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Tabella con animazione */}
            <div className="p-4 min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStandings.category}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b-2 border-gray-100 text-gray-500">
                                        <th className="py-2 text-left w-12">Pos</th>
                                        <th className="py-2 text-left">Squadra</th>
                                        <th className="py-2 text-center w-12">PT</th>
                                        <th className="py-2 text-center w-12">G</th>
                                        <th className="py-2 text-center w-12 hidden sm:table-cell">V</th>
                                        <th className="py-2 text-center w-12 hidden sm:table-cell">P</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentStandings.rows.map((row, index) => {
                                        const isVirtus = row.team.includes("Virtus");
                                        return (
                                            <tr
                                                key={index}
                                                className={`border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${isVirtus ? 'bg-blue-50' : ''}`}
                                            >
                                                <td className="py-3 font-bold text-gray-400">
                                                    <span className={`flex items-center justify-center w-6 h-6 rounded-full ${index < 3 ? 'bg-virtus-yellow text-virtus-blue' : ''}`}>
                                                        {row.rank}
                                                    </span>
                                                </td>
                                                <td className={`py-3 font-bold ${isVirtus ? 'text-virtus-blue' : 'text-gray-700'}`}>
                                                    {row.team}
                                                </td>
                                                <td className="py-3 text-center font-bold text-virtus-blue">{row.points}</td>
                                                <td className="py-3 text-center text-gray-600">{row.played}</td>
                                                <td className="py-3 text-center text-green-600 hidden sm:table-cell">{row.won}</td>
                                                <td className="py-3 text-center text-red-500 hidden sm:table-cell">{row.lost}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 text-center">
                            <a href="#" className="text-xs font-bold text-gray-400 hover:text-virtus-blue uppercase tracking-widest transition-colors">
                                Vedi classifica completa
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

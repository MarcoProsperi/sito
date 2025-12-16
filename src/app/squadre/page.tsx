"use client";

import Image from "next/image";
import CalendarWidget from "@/components/CalendarWidget";
import StandingsWidget from "@/components/StandingsWidget";

// Dati Roster Placeholder
const roster = [
    { number: 4, name: "Marco Rossi", position: "Playmaker", height: "185 cm", year: "2000" },
    { number: 7, name: "Luca Bianchi", position: "Guardia", height: "190 cm", year: "1998" },
    { number: 10, name: "Alessandro Verdi", position: "Ala Piccola", height: "195 cm", year: "1999" },
    { number: 12, name: "Matteo Neri", position: "Ala Grande", height: "200 cm", year: "2001" },
    { number: 15, name: "Giovanni Gialli", position: "Centro", height: "205 cm", year: "1995" },
    { number: 23, name: "Francesco Blu", position: "Guardia", height: "188 cm", year: "2002" },
    { number: 33, name: "Davide Viola", position: "Ala", height: "198 cm", year: "1997" },
    { number: 0, name: "Simone Arancio", position: "Playmaker", height: "182 cm", year: "2003" },
];

// Dati Staff Placeholder
const staff = [
    { role: "Head Coach", name: "Stefano Mancini" },
    { role: "Assistant Coach", name: "Luigi Verdi" },
    { role: "Preparatore Fisico", name: "Marco Gialli" },
    { role: "Dirigente Accompagnatore", name: "Paolo Rossi" },
];

export default function PrimaSquadraPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden bg-virtus-blue">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero.png" // Placeholder image
                        alt="Virtus Velletri Prima Squadra"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-virtus-blue via-virtus-blue/50 to-transparent z-10"></div>
                <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter leading-none mb-4">
                        DR1
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200">
                        Divisione Regionale 1 - Stagione 2024/25
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Roster (2/3 width) */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Roster */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-display font-bold text-virtus-blue uppercase tracking-tight mb-6 flex items-center">
                                <span className="w-2 h-8 bg-virtus-yellow mr-4"></span>
                                Roster
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {roster.map((player) => (
                                    <div key={player.number} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow border border-gray-100">
                                        <div className="flex">
                                            {/* Player Image Placeholder */}
                                            <div className="w-1/3 bg-gray-200 relative">
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-3xl opacity-50">
                                                    #{player.number}
                                                </div>
                                            </div>

                                            {/* Player Info */}
                                            <div className="w-2/3 p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-virtus-blue uppercase leading-tight group-hover:text-virtus-yellow transition-colors">{player.name}</h3>
                                                        <p className="text-sm font-bold text-gray-500 uppercase">{player.position}</p>
                                                    </div>
                                                    <span className="text-2xl font-display font-bold text-gray-200 group-hover:text-virtus-blue/20 transition-colors">
                                                        {player.number}
                                                    </span>
                                                </div>

                                                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <span className="text-gray-400 block uppercase text-[10px]">Altezza</span>
                                                        <span className="font-bold text-gray-700">{player.height}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400 block uppercase text-[10px]">Anno</span>
                                                        <span className="font-bold text-gray-700">{player.year}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Staff Section */}
                        <div>
                            <h2 className="text-3xl font-display font-bold text-virtus-blue uppercase tracking-tight mb-6 flex items-center">
                                <span className="w-2 h-8 bg-virtus-yellow mr-4"></span>
                                Staff Tecnico
                            </h2>
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {staff.map((member, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-12 h-12 bg-virtus-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-virtus-yellow uppercase tracking-wider">{member.role}</div>
                                                <div className="font-bold text-lg text-gray-800">{member.name}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Calendar & Standings (1/3 width) */}
                    <div className="space-y-12">

                        {/* Classifica */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-virtus-blue uppercase tracking-tight mb-4 pb-2 border-b-2 border-virtus-yellow">
                                Classifica
                            </h2>
                            <StandingsWidget />
                        </div>

                        {/* Calendario */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-virtus-blue uppercase tracking-tight mb-4 pb-2 border-b-2 border-virtus-yellow">
                                Prossime Gare
                            </h2>
                            <CalendarWidget />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

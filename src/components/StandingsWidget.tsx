"use client";

import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export interface StandingRow {
    rank: number;
    team: string;
    points: number;
    played?: number;
    won?: number;
    lost?: number;
}

interface StandingsWidgetProps {
    standings?: StandingRow[];
    title?: string;
}

export default function StandingsWidget({ standings, title = "Classifica" }: StandingsWidgetProps) {
    if (!standings || standings.length === 0) {
        return null;
    }

    // Sort by points desc, then rank asc
    const sortedStandings = [...standings].sort((a, b) => b.points - a.points || a.rank - b.rank);

    return (
        <section className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-8">
            {/* Header */}
            <div className="bg-virtus-blue p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-virtus-yellow" />
                    <h3 className="text-xl font-display font-bold uppercase tracking-tight">
                        {title}
                    </h3>
                </div>
            </div>

            {/* Table */}
            <div className="p-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-100 text-gray-500">
                                <th className="py-2 text-left w-12">Pos</th>
                                <th className="py-2 text-left">Squadra</th>
                                <th className="py-2 text-center w-12">PT</th>
                                <th className="py-2 text-center w-12 hidden sm:table-cell">G</th>
                                <th className="py-2 text-center w-12 hidden sm:table-cell">V</th>
                                <th className="py-2 text-center w-12 hidden sm:table-cell">P</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedStandings.map((row, index) => {
                                const isVirtus = row.team.toLowerCase().includes("virtus");
                                return (
                                    <tr
                                        key={index}
                                        className={`border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${isVirtus ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="py-3 font-bold text-gray-400">
                                            <span className={`flex items-center justify-center w-6 h-6 rounded-full ${row.rank <= 3 ? 'bg-virtus-yellow text-virtus-blue' : ''}`}>
                                                {row.rank}
                                            </span>
                                        </td>
                                        <td className={`py-3 font-bold ${isVirtus ? 'text-virtus-blue' : 'text-gray-700'}`}>
                                            {row.team}
                                        </td>
                                        <td className="py-3 text-center font-bold text-virtus-blue">{row.points}</td>
                                        <td className="py-3 text-center text-gray-600 hidden sm:table-cell">{row.played || '-'}</td>
                                        <td className="py-3 text-center text-green-600 hidden sm:table-cell">{row.won || '-'}</td>
                                        <td className="py-3 text-center text-red-500 hidden sm:table-cell">{row.lost || '-'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

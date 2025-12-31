import { getMatchBySlug, getAllMatches } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Calendar, Clock, MapPin, Navigation, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
    const matches = getAllMatches();
    return matches.map((match) => ({
        slug: match.slug,
    }));
}

export default async function MatchPage({ params }: { params: { slug: string } }) {
    const { slug } = await Promise.resolve(params);
    const match = getMatchBySlug(slug);

    if (!match) {
        notFound();
    }

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.location || '')}`;

    // Format date in Italian
    const dateObj = new Date(match.date);
    const formattedDate = dateObj.toLocaleDateString('it-IT', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                {/* Back Button */}
                <Link
                    href={`/${match.teamId}`}
                    className="inline-flex items-center text-virtus-blue hover:text-virtus-yellow mb-8 font-bold transition-colors group"
                >
                    <MoveLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Torna alla squadra
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-virtus-blue p-8 md:p-12 text-center text-white relative">
                        <div className="absolute top-4 right-4 bg-virtus-yellow text-virtus-blue px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                            {match.category}
                        </div>
                        <h1 className="text-2xl md:text-4xl font-display font-black uppercase mb-2">
                            {match.title}
                        </h1>
                        {match.score && (
                            <div className="mt-4 flex flex-col items-center">
                                <div className="text-[10px] font-black uppercase tracking-widest text-virtus-yellow opacity-80 mb-1">Risultato Finale</div>
                                <div className="text-4xl md:text-6xl font-display font-black tracking-tighter text-virtus-yellow drop-shadow-lg">
                                    {match.score}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Details Grid */}
                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                            {/* Left: Info */}
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-virtus-blue shrink-0">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Data</div>
                                        <div className="text-lg font-bold text-gray-800 capitalize">{formattedDate}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-virtus-blue shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ora</div>
                                        <div className="text-lg font-bold text-gray-800">{match.time || 'TBD'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Location */}
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-virtus-blue shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Campo da Gioco</div>
                                        <div className="text-lg font-bold text-gray-800 mb-4 leading-snug">
                                            {match.location}
                                        </div>

                                        <a
                                            href={mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-virtus-yellow hover:bg-yellow-400 text-virtus-blue px-6 py-3 rounded-xl font-black uppercase tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95"
                                        >
                                            <Navigation className="w-5 h-5 mr-2" />
                                            Apri in Maps
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                        <p className="text-sm text-gray-500 font-medium">
                            Per qualsiasi variazione dell'ultimo minuto, si prega di consultare i canali ufficiali della Federazione.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

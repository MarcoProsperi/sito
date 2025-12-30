import { Dribbble } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galleria | Virtus Velletri',
    description: 'Le foto più belle delle nostre partite ed eventi.',
};

const teams = [
    { name: 'DR1', category: 'Senior', count: 0 },
    { name: 'DR3', category: 'Senior', count: 0 },
    { name: 'Amatori', category: 'Senior', count: 0 },
    { name: 'Progetto Basket', category: 'Giovanili', count: 0 },
    { name: 'Under 17', category: 'Giovanili', count: 0 },
    { name: 'Under 15', category: 'Giovanili', count: 0 },
    { name: 'Under 14', category: 'Giovanili', count: 0 },
    { name: 'Under 13', category: 'Giovanili', count: 0 },
    { name: 'Pulcini', category: 'Minibasket', count: 0 },
    { name: 'Scoiattoli Small', category: 'Minibasket', count: 0 },
    { name: 'Scoiattoli Big', category: 'Minibasket', count: 0 },
    { name: 'Aquilotti Small', category: 'Minibasket', count: 0 },
    { name: 'Aquilotti Big', category: 'Minibasket', count: 0 },
    { name: 'Esordienti', category: 'Minibasket', count: 0 },
    { name: 'Feste ed Eventi', category: 'Eventi', count: 0 },
    { name: 'Momenti Virtus', category: 'Varie', count: 0 },
];

export default function GalleryPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-virtus-blue tracking-tight">
                        Galleria Fotografica
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Scegli una squadra per vedere le foto.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {teams.map((team, index) => (
                        <Link
                            key={index}
                            href="#"
                            className="group bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(31,50,90,0.15)] border border-gray-100 p-6 flex flex-col items-center justify-center hover:shadow-[0_8px_30px_-2px_rgba(31,50,90,0.25)] hover:border-virtus-blue/30 transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-virtus-yellow group-hover:text-white transition-colors">
                                <Dribbble className="w-8 h-8 text-virtus-blue group-hover:text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-virtus-blue transition-colors">
                                {team.name}
                            </h3>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
                                {team.category}
                            </span>
                            {/* 
                        <span className="text-xs text-gray-400 mt-2 bg-gray-100 px-2 py-1 rounded-full">
                            {team.count} Foto
                        </span> 
                        */}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

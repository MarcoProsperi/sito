"use client";

export default function SponsorsWidget() {
    return (
        <section className="bg-white rounded-lg p-6 shadow-md mb-8">
            <h3 className="text-xl font-display font-bold text-virtus-blue uppercase tracking-tight mb-4 pb-2 border-b-2 border-virtus-yellow">
                Partner
            </h3>
            <div className="h-80 overflow-hidden relative">
                <div className="animate-scroll-up space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-gray-50 rounded p-4 flex items-center justify-center h-20 border border-gray-200 hover:border-virtus-yellow transition-colors flex-shrink-0">
                            <span className="text-sm font-bold text-gray-400">Sponsor {i}</span>
                        </div>
                    ))}
                    {/* Duplicate for infinite scroll */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={`dup-${i}`} className="bg-gray-50 rounded p-4 flex items-center justify-center h-20 border border-gray-200 hover:border-virtus-yellow transition-colors flex-shrink-0">
                            <span className="text-sm font-bold text-gray-400">Sponsor {i}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        .animate-scroll-up {
          animation: scrollUp 20s linear infinite;
        }
        
        .animate-scroll-up:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
}

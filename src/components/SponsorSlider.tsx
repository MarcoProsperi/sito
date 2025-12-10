"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Lista sponsor - puoi aggiungere/modificare qui
const sponsors = [
    { name: "Sponsor 1", logo: "/images/sponsors/sponsor-1.png" },
    { name: "Sponsor 2", logo: "/images/sponsors/sponsor-2.png" },
    { name: "Sponsor 3", logo: "/images/sponsors/sponsor-3.png" },
    { name: "Sponsor 4", logo: "/images/sponsors/sponsor-4.png" },
    { name: "Sponsor 5", logo: "/images/sponsors/sponsor-5.png" },
    { name: "Sponsor 6", logo: "/images/sponsors/sponsor-6.png" },
    { name: "Sponsor 7", logo: "/images/sponsors/sponsor-7.png" },
    { name: "Sponsor 8", logo: "/images/sponsors/sponsor-8.png" },
];

export default function SponsorSlider() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scrollSpeed = 0.5; // Velocità di scorrimento (pixel per frame)

        const scroll = () => {
            scrollPosition += scrollSpeed;

            // Reset quando arriviamo a metà (dato che duplichiamo i loghi)
            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }

            scrollContainer.scrollLeft = scrollPosition;
            requestAnimationFrame(scroll);
        };

        const animationId = requestAnimationFrame(scroll);

        // Pausa al passaggio del mouse
        const handleMouseEnter = () => {
            cancelAnimationFrame(animationId);
        };

        const handleMouseLeave = () => {
            requestAnimationFrame(scroll);
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Duplichiamo i loghi per un loop infinito senza salti
    const duplicatedSponsors = [...sponsors, ...sponsors];

    return (
        <section className="py-16 bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-virtus-blue uppercase tracking-tighter text-center mb-8">
                    I Nostri Partner
                </h2>
                <div className="h-1 w-20 bg-virtus-yellow mx-auto mb-12"></div>

                <div
                    ref={scrollRef}
                    className="overflow-hidden"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <div className="flex gap-8 md:gap-12 items-center">
                        {duplicatedSponsors.map((sponsor, index) => (
                            <div
                                key={`${sponsor.name}-${index}`}
                                className="flex-shrink-0 w-32 h-24 md:w-40 md:h-28 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                            >
                                <div className="w-full h-full bg-white rounded-lg shadow-md flex items-center justify-center p-4 border border-gray-100">
                                    {/* Placeholder - sostituire con loghi veri */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                                        <span className="text-xs font-bold text-gray-500 text-center px-2">
                                            {sponsor.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-center text-gray-600 mt-8 text-sm">
                    Vuoi diventare nostro partner? <a href="/contatti" className="text-virtus-blue font-bold hover:text-virtus-yellow transition-colors">Contattaci</a>
                </p>
            </div>

            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}

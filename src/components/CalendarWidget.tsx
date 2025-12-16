"use client";

import Link from "next/link";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
}

const ucomingEvents: Event[] = [
    {
        id: 1,
        title: "U17 vs Basket Frascati",
        date: "14 Dic",
        time: "18:00",
        location: "Palazzetto dello Sport",
        category: "Under 17"
    },
    {
        id: 2,
        title: "Virtus vs Albano",
        date: "15 Dic",
        time: "20:30",
        location: "Trasferta",
        category: "Serie C"
    },
    {
        id: 3,
        title: "Festa di Natale",
        date: "20 Dic",
        time: "17:00",
        location: "Velletri",
        category: "Evento"
    }
];

export default function CalendarWidget() {
    // Link al Google Calendar pubblico (puoi sostituirlo con quello vero)
    const googleCalendarUrl = "https://calendar.google.com/calendar/r";

    return (
        <section className="bg-white rounded-lg p-6 shadow-md border-t-4 border-virtus-blue">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <h3 className="text-xl font-display font-bold text-virtus-blue uppercase tracking-tight">
                    Prossimi Eventi
                </h3>
                <CalendarIcon className="w-5 h-5 text-virtus-yellow" />
            </div>

            <div className="space-y-4">
                {ucomingEvents.map((event) => (
                    <div key={event.id} className="group cursor-pointer">
                        <div className="flex gap-3 items-start">
                            {/* Date Box */}
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-gray-200 group-hover:border-virtus-yellow transition-colors">
                                <span className="text-xs font-bold text-virtus-blue uppercase">{event.date.split(' ')[1]}</span>
                                <span className="text-lg font-bold text-gray-800 leading-none">{event.date.split(' ')[0]}</span>
                            </div>

                            {/* Details */}
                            <div className="flex-grow">
                                <span className="text-[10px] font-bold text-white bg-virtus-yellow px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    {event.category}
                                </span>
                                <h4 className="font-bold text-gray-800 text-sm mt-1 leading-tight group-hover:text-virtus-blue transition-colors">
                                    {event.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {event.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {event.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-6 bg-virtus-blue hover:bg-virtus-blue/90 text-white text-center py-2 rounded-md transition-colors text-sm font-bold uppercase tracking-wide"
            >
                Vedi Calendario Completo
            </a>
        </section>
    );
}

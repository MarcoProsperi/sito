"use client";

import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";

export interface CalendarEvent {
    title: string;
    date: string;
    time?: string;
    location?: string;
    category?: string;
}

interface CalendarWidgetProps {
    events?: CalendarEvent[];
}

export default function CalendarWidget({ events }: CalendarWidgetProps) {
    if (!events || events.length === 0) {
        return null;
    }

    // Link al Google Calendar pubblico (puoi sostituirlo con quello vero)
    const googleCalendarUrl = "https://calendar.google.com/calendar/r";

    return (
        <section className="bg-white rounded-lg p-6 shadow-md border-t-4 border-virtus-blue">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <h3 className="text-xl font-display font-bold text-virtus-blue uppercase tracking-tight">
                    Prossime Gare
                </h3>
                <CalendarIcon className="w-5 h-5 text-virtus-yellow" />
            </div>

            <div className="space-y-4">
                {events.map((event, index) => (
                    <div key={index} className="group cursor-pointer">
                        <div className="flex gap-3 items-start">
                            {/* Date Box */}
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-gray-200 group-hover:border-virtus-yellow transition-colors">
                                <span className="text-xs font-bold text-virtus-blue uppercase">{event.date.split(' ')[1] || ''}</span>
                                <span className="text-lg font-bold text-gray-800 leading-none">{event.date.split(' ')[0] || event.date}</span>
                            </div>

                            {/* Details */}
                            <div className="flex-grow">
                                {event.category && (
                                    <span className="text-[10px] font-bold text-white bg-virtus-yellow px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        {event.category}
                                    </span>
                                )}
                                <h4 className="font-bold text-gray-800 text-sm mt-1 leading-tight group-hover:text-virtus-blue transition-colors">
                                    {event.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    {event.time && (
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {event.time}
                                        </span>
                                    )}
                                    {event.location && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {event.location}
                                        </span>
                                    )}
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

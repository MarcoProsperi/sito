import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-virtus-yellow text-virtus-blue pt-16 pb-8 border-t border-virtus-blue/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Logo & Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-virtus-blue tracking-tight">VIRTUS VELLETRI</h3>
                        <p className="text-virtus-blue/80 mb-6 leading-relaxed">
                            Associazione Sportiva Dilettantistica.<br />
                            Promuoviamo il basket e i suoi valori dal 1996.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://www.facebook.com/virtusvelletribasket/" target="_blank" rel="noopener noreferrer" className="p-2 bg-virtus-blue/10 rounded-full text-virtus-blue hover:bg-virtus-blue hover:text-virtus-yellow transition-all duration-300">
                                <Facebook size={20} />
                            </Link>
                            <Link href="https://www.instagram.com/virtusvelletri_bk/" target="_blank" rel="noopener noreferrer" className="p-2 bg-virtus-blue/10 rounded-full text-virtus-blue hover:bg-virtus-blue hover:text-virtus-yellow transition-all duration-300">
                                <Instagram size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-virtus-blue">Link Rapidi</h3>
                        <ul className="space-y-3 text-virtus-blue/80">
                            <li><Link href="/storia" className="hover:text-virtus-blue transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-virtus-blue rounded-full"></span>La Storia</Link></li>
                            <li><Link href="/squadre" className="hover:text-virtus-blue transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-virtus-blue rounded-full"></span>Le Squadre</Link></li>
                            <li><Link href="/gallery" className="hover:text-virtus-blue transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-virtus-blue rounded-full"></span>Galleria</Link></li>
                            <li><Link href="/contatti" className="hover:text-virtus-blue transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-virtus-blue rounded-full"></span>Contatti</Link></li>
                        </ul>
                    </div>

                    {/* Contatti */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-virtus-blue">Contatti</h3>
                        <ul className="space-y-4 text-virtus-blue/80">
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-3 mt-1 text-virtus-blue flex-shrink-0" />
                                <span>Palestra Polivalente<br />Via del Campo Sportivo, Velletri</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-3 text-virtus-blue flex-shrink-0" />
                                <a href="mailto:info@virtusvelletri.it" className="hover:text-virtus-blue transition-colors">info@virtusvelletri.it</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-virtus-blue/20 pt-8 text-center text-virtus-blue/70 text-sm">
                    <p>&copy; {new Date().getFullYear()} A.S.D. Virtus Velletri. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    );
}

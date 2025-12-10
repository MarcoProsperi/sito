"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import type { MenuItem } from "@/lib/content";

export default function Navbar({ menu }: { menu: MenuItem[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleSubmenu = (label: string) => {
        if (openSubmenu === label) {
            setOpenSubmenu(null);
        } else {
            setOpenSubmenu(label);
        }
    };

    return (
        <nav className="fixed w-full z-50 backdrop-blur-md shadow-lg border-b border-white/10 overflow-hidden">
            {/* Diagonal background for navbar */}
            <div className="absolute inset-0 bg-gradient-to-br from-virtus-yellow/95 via-virtus-yellow/95 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-virtus-blue/95 via-virtus-blue/95 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform group-hover:scale-105">
                                <Image
                                    src="/images/logo.png"
                                    alt="Virtus Velletri Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-xl md:text-2xl font-bold tracking-tighter text-white hidden sm:block">
                                VIRTUS <span className="text-virtus-yellow">VELLETRI</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {menu.map((item) => (
                            <div key={item.label} className="relative group">
                                {item.children ? (
                                    <button
                                        className={`flex items-center gap-1 text-base font-display font-medium transition-colors uppercase tracking-wider py-2 ${pathname.startsWith(item.href) && item.href !== "/" ? "text-virtus-yellow font-bold" : "text-white/90 hover:text-virtus-yellow"
                                            }`}
                                    >
                                        {item.label}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`text-base font-display font-medium transition-colors uppercase tracking-wider relative group-hover:text-virtus-yellow ${pathname === item.href ? "text-virtus-yellow font-bold" : "text-white/90"
                                            }`}
                                    >
                                        {item.label}
                                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-virtus-yellow transition-all group-hover:w-full ${pathname === item.href ? "w-full" : ""}`}></span>
                                    </Link>
                                )}

                                {/* Dropdown */}
                                {item.children && (
                                    <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-virtus-blue border border-white/10 rounded-none shadow-2xl overflow-hidden py-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block px-6 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-virtus-yellow font-display uppercase tracking-wide border-l-2 border-transparent hover:border-virtus-yellow transition-all"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-virtus-yellow focus:outline-none p-2"
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-virtus-blue border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {menu.map((item) => (
                                <div key={item.label}>
                                    {item.children ? (
                                        <>
                                            <button
                                                onClick={() => toggleSubmenu(item.label)}
                                                className="w-full flex justify-between items-center py-3 text-lg font-medium text-white border-b border-white/10"
                                            >
                                                {item.label}
                                                <ChevronDown className={`w-5 h-5 transition-transform ${openSubmenu === item.label ? "rotate-180" : ""}`} />
                                            </button>
                                            <AnimatePresence>
                                                {openSubmenu === item.label && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="pl-4 space-y-2 bg-black/20 overflow-hidden rounded-md my-1"
                                                    >
                                                        {item.children.map(child => (
                                                            <Link
                                                                key={child.label}
                                                                href={child.href}
                                                                onClick={toggleMenu}
                                                                className="block py-2 text-base text-white/80 hover:text-virtus-yellow pl-2"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            onClick={toggleMenu}
                                            className={`block py-3 text-lg font-medium border-b border-white/10 ${pathname === item.href ? "text-virtus-yellow" : "text-white"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

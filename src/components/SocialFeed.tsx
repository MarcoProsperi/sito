"use client";

import InstagramGrid from "./InstagramGrid";

export default function SocialFeed() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-virtus-blue uppercase tracking-tighter">
                        Seguici sui Social
                    </h2>
                    <div className="h-2 w-24 bg-virtus-yellow mt-4 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Facebook Feed */}
                    <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                        <h3 className="text-2xl font-display font-bold text-virtus-blue mb-6 flex items-center gap-3">
                            <svg className="w-8 h-8 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </h3>
                        <div className="overflow-hidden rounded-lg">
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fvirtusvelletribasket%2F&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                width="100%"
                                height="600"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                    </div>

                    {/* Instagram Feed */}
                    <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                        <h3 className="text-2xl font-display font-bold text-virtus-blue mb-6 flex items-center gap-3">
                            <svg className="w-8 h-8 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            Instagram
                        </h3>
                        <div className="text-center">
                            <a
                                href="https://www.instagram.com/virtusvelletri_bk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-display font-bold text-lg uppercase tracking-wider rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Segui su Instagram
                            </a>
                            <p className="mt-6 text-gray-600">
                                Clicca per vedere i nostri ultimi post, foto e video!
                            </p>
                            <div className="mt-8 grid grid-cols-3 gap-4">
                                <div className="aspect-square bg-gradient-to-br from-virtus-blue to-virtus-yellow/20 rounded-lg"></div>
                                <div className="aspect-square bg-gradient-to-br from-virtus-yellow to-virtus-blue/20 rounded-lg"></div>
                                <div className="aspect-square bg-gradient-to-br from-virtus-blue to-virtus-yellow/20 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

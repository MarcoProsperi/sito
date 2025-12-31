import { getNewsBySlug, getAllNews } from '@/lib/content';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronLeft, Share2 } from 'lucide-react';

export async function generateStaticParams() {
    const news = getAllNews();
    return news.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await Promise.resolve(params);
    const item = getNewsBySlug(slug);

    if (!item) return { title: 'News non trovata' };

    return {
        title: `${item.meta.title} | Virtus Velletri`,
        description: item.meta.description,
    };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await Promise.resolve(params);
    const item = getNewsBySlug(slug);

    if (!item) notFound();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Minimal Header for Blog Post */}
            <div className="relative h-[60vh] w-full pt-20">
                <Image
                    src={item.meta.image || "/images/hero.png"}
                    alt={item.meta.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-virtus-blue to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-virtus-yellow text-sm font-bold uppercase tracking-wider mb-6 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" /> Torna alle News
                        </Link>

                        <div className="flex items-center gap-3 text-virtus-yellow text-sm font-bold uppercase tracking-widest mb-4">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.meta.date).toLocaleDateString('it-IT', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-none">
                            {item.meta.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8 md:p-16">
                        <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-virtus-blue prose-p:text-gray-700 prose-strong:text-virtus-blue prose-blockquote:border-virtus-yellow prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-a:text-virtus-blue hover:prose-a:text-virtus-yellow transition-colors">
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                        </article>

                        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                            <div className="text-gray-400 text-sm font-medium">
                                © {new Date().getFullYear()} Virtus Velletri Basket
                            </div>
                            <button className="flex items-center gap-2 text-virtus-blue hover:text-virtus-yellow font-bold text-sm uppercase tracking-wider transition-colors">
                                <Share2 className="w-4 h-4" /> Condividi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

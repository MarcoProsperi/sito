import { getPageContent, getAllPages } from '@/lib/content';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateStaticParams() {
    const pages = getAllPages();
    return pages.map((page) => ({
        slug: page?.slug,
    })).filter(p => p.slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await Promise.resolve(params);
    const page = getPageContent(slug);

    if (!page) {
        return {
            title: 'Pagina Non Trovata',
        };
    }

    return {
        title: `${page.meta.title} | Virtus Velletri`,
        description: page.meta.description || 'Virtus Velletri Basket',
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await Promise.resolve(params);
    const page = getPageContent(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header with Hero Image Background */}
            <div className="relative pt-24 pb-8 md:pt-28 md:pb-10 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-virtus-blue/80"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-3 text-white tracking-tight">
                        {page.meta.title}
                    </h1>
                    {page.meta.description && (
                        <p className="text-base md:text-lg text-virtus-yellow/90 max-w-2xl mx-auto font-medium">
                            {page.meta.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Content Card */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
                    <article className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:text-virtus-blue prose-a:text-virtus-blue hover:prose-a:text-yellow-600 prose-img:rounded-xl prose-img:shadow-md prose-strong:text-virtus-blue">
                        <ReactMarkdown>{page.content}</ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    );
}

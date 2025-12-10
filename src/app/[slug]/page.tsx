import { getPageContent, getAllPages } from '@/lib/content';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const pages = getAllPages();
    return pages.map((page) => ({
        slug: page?.slug,
    })).filter(p => p.slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    // Await params for Next.js 15+ compatibility if needed, though usually standard in 14
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
    const { slug } = await Promise.resolve(params); // Future-proofing for async params
    const page = getPageContent(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Colorful Header */}
            <div className="bg-virtus-blue pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-virtus-yellow/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight">
                        {page.meta.title}
                    </h1>
                    {page.meta.description && (
                        <p className="text-lg md:text-xl text-virtus-yellow/90 max-w-2xl mx-auto font-medium">
                            {page.meta.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Content Card */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <article className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:text-virtus-blue prose-a:text-virtus-blue hover:prose-a:text-yellow-600 prose-img:rounded-xl prose-img:shadow-md prose-strong:text-virtus-blue">
                        <ReactMarkdown>{page.content}</ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    );
}

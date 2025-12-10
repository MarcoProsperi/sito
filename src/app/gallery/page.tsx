import GalleryGrid from '@/components/GalleryGrid';
import { getGalleryImages } from '@/lib/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galleria | Virtus Velletri',
    description: 'Le foto più belle delle nostre partite ed eventi.',
};

export default function GalleryPage() {
    const images = getGalleryImages();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-virtus-blue tracking-tight">
                    Galleria Fotografica
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    I momenti più emozionanti della nostra stagione.
                </p>
            </div>

            <GalleryGrid images={images} />
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GalleryGrid({ images }: { images: string[] }) {
    if (images.length === 0) {
        return <div className="text-center text-gray-500 py-10">Nessuna foto nella galleria.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((src, index) => (
                <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow group"
                >
                    <Image
                        src={src}
                        alt={`Foto ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>
            ))}
        </div>
    );
}

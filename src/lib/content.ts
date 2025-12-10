import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export type MenuItem = {
    label: string;
    href: string;
    children?: MenuItem[];
};

export function getMenu(): MenuItem[] {
    try {
        const fullPath = path.join(contentDirectory, 'config', 'menu.json');
        if (!fs.existsSync(fullPath)) return [];
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading menu:", error);
        return [];
    }
}

export function getPageContent(slug: string) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, 'pages', `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { slug: realSlug, meta: data, content };
}

export function getAllPages() {
    const pagesDir = path.join(contentDirectory, 'pages');
    if (!fs.existsSync(pagesDir)) return [];

    const files = fs.readdirSync(pagesDir);
    return files.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return getPageContent(slug);
    });
}

export function getGalleryImages() {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    if (!fs.existsSync(galleryDir)) return [];

    const files = fs.readdirSync(galleryDir);
    // Filter for image extensions
    return files.filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map(file => `/gallery/${file}`);
}

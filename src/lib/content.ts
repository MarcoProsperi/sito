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

// ----------------------------------------------------------------------------
// NEW MIGRATED METHODS FOR STANDINGS AND MATCHES
// ----------------------------------------------------------------------------

export function getAllStandings() {
    const dir = path.join(contentDirectory, 'standings');
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    return files.map((fileName) => {
        // Prevent reading non-md files
        if (!fileName.endsWith('.md')) return null;

        const fullPath = path.join(dir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return {
            title: data.title,
            categoryId: data.team_slug, // Keep existing property name for compatibility or mapping
            team_slug: data.team_slug,
            data: data.table || [] // Map 'table' from YAML to 'data' prop expected by widget
        };
    }).filter((item): item is NonNullable<typeof item> => item !== null);
}

export interface MatchEvent {
    title: string;
    date: string;
    time?: string;
    location?: string;
    category?: string;
    teamId?: string;
    slug: string;
    score?: string;
}

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

export function getAllMatches(): MatchEvent[] {
    const dir = path.join(contentDirectory, 'matches');
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    return files.flatMap((fileName) => {
        // Prevent reading non-md files
        if (!fileName.endsWith('.md')) return [];

        const fullPath = path.join(dir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        // Return individual events, but enrich them with group info if needed
        return (data.events || []).map((event: any) => {
            const slug = slugify(`${event.title}-${event.date}`);
            return {
                ...event,
                slug,
                teamId: data.team_slug // Inject team_slug into each event
            };
        });
    });
}

export function getMatchBySlug(slug: string): MatchEvent | null {
    const allMatches = getAllMatches();
    return allMatches.find(m => m.slug === slug) || null;
}

// ----------------------------------------------------------------------------
// NEWS METHODS
// ----------------------------------------------------------------------------

export function getAllNews() {
    const dir = path.join(contentDirectory, 'news');
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    return files.map((fileName) => {
        if (!fileName.endsWith('.md')) return null;

        const fullPath = path.join(dir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = fileName.replace(/\.md$/, '');

        return {
            slug,
            meta: data,
            content
        };
    }).filter((n): n is NonNullable<typeof n> => n !== null)
        .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getNewsBySlug(slug: string) {
    const fullPath = path.join(contentDirectory, 'news', `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { slug, meta: data, content };
}

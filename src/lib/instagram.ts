// Instagram Basic Display API Integration
// This file handles fetching Instagram posts

export interface InstagramPost {
    id: string;
    caption?: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    permalink: string;
    timestamp: string;
}

// Mock data for preview (replace with real API data)
const MOCK_POSTS: InstagramPost[] = [
    {
        id: '1',
        caption: 'Allenamento intenso! 🏀💪 #VirtusVelletri',
        media_type: 'IMAGE',
        media_url: '/images/gallery/placeholder-1.jpg',
        permalink: 'https://www.instagram.com/p/example1/',
        timestamp: new Date().toISOString(),
    },
    {
        id: '2',
        caption: 'Grande vittoria! 🎉 #BasketVelletri',
        media_type: 'IMAGE',
        media_url: '/images/gallery/placeholder-2.jpg',
        permalink: 'https://www.instagram.com/p/example2/',
        timestamp: new Date().toISOString(),
    },
    {
        id: '3',
        caption: 'I nostri campioni! ⭐',
        media_type: 'IMAGE',
        media_url: '/images/gallery/placeholder-3.jpg',
        permalink: 'https://www.instagram.com/p/example3/',
        timestamp: new Date().toISOString(),
    },
    {
        id: '4',
        caption: 'Partita emozionante! 🏆',
        media_type: 'IMAGE',
        media_url: '/images/gallery/placeholder-4.jpg',
        permalink: 'https://www.instagram.com/p/example4/',
        timestamp: new Date().toISOString(),
    },
    {
        id: '5',
        caption: 'Minibasket in azione! 👶🏀',
        media_type: 'IMAGE',
        media_url: '/images/gallery/placeholder-5.jpg',
        permalink: 'https://www.instagram.com/p/example5/',
        timestamp: new Date().toISOString(),
    },
    {
        id: '6',
        caption: 'Team spirit! 💙💛',
        media_type: 'IMAGE',
        media_url: '/images/gallery/placeholder-6.jpg',
        permalink: 'https://www.instagram.com/p/example6/',
        timestamp: new Date().toISOString(),
    },
];

/**
 * Fetches Instagram posts using Instagram Basic Display API
 * 
 * SETUP REQUIRED:
 * 1. Create a Facebook App at https://developers.facebook.com
 * 2. Add Instagram Basic Display product
 * 3. Get your Access Token
 * 4. Add INSTAGRAM_ACCESS_TOKEN to your .env.local file
 * 
 * For now, returns mock data
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    // If no access token, return mock data
    if (!accessToken) {
        console.log('📸 Instagram: Using mock data (no access token configured)');
        return MOCK_POSTS;
    }

    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error('Failed to fetch Instagram posts');
        }

        const data = await response.json();
        return data.data.slice(0, 6); // Return only 6 most recent posts
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        // Fallback to mock data on error
        return MOCK_POSTS;
    }
}

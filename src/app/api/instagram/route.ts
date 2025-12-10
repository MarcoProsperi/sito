import { NextResponse } from 'next/server';
import { getInstagramPosts } from '@/lib/instagram';

export async function GET() {
    try {
        const posts = await getInstagramPosts();

        return NextResponse.json({
            success: true,
            posts,
            count: posts.length,
        });
    } catch (error) {
        console.error('Instagram API error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch Instagram posts',
                posts: [],
            },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { processChatMessage, ChatMessage } from '@/lib/chatbot/chatEngine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        {
          error: 'Invalid request body. "messages" array is required.',
        },
        { status: 400 }
      );
    }

    // Sanitize and validate messages array
    const rawMessages = body.messages as Array<{ role?: unknown; content?: unknown }>;
    const cleanMessages: ChatMessage[] = [];

    for (const msg of rawMessages.slice(-10)) { // limit to last 10 messages for context
      if (typeof msg.content === 'string' && msg.content.trim()) {
        const role = msg.role === 'user' || msg.role === 'assistant' ? msg.role : 'user';
        // Limit each message length to 1000 characters
        cleanMessages.push({
          role,
          content: msg.content.trim().slice(0, 1000),
        });
      }
    }

    if (cleanMessages.length === 0) {
      return NextResponse.json(
        {
          error: 'At least one valid message content is required.',
        },
        { status: 400 }
      );
    }

    // Process chat through LifeBloom domain engine & guardrails
    const result = await processChatMessage(cleanMessages);

    return NextResponse.json(
      {
        success: true,
        reply: result.reply,
        links: result.links || [],
        detectedLanguage: result.detectedLanguage,
        isOutOfField: result.isOutOfField,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/chat route:', error);
    return NextResponse.json(
      {
        success: false,
        reply:
          "I'm here to support your personal growth journey with LifeBloom. You can also explore our programs at /services or connect with Dr. Shivani directly at /contact.",
        links: [
          { label: 'Explore Services', href: '/services' },
          { label: 'Book Discovery Call', href: '/contact' },
        ],
      },
      { status: 500 }
    );
  }
}

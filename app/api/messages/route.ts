import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createMessageSchema = z.object({
  message: z.string().min(1, { message: 'Message is required' }),
});

export async function POST(req: Request) {
  try {
    const query = await req.json();

    const session = await getServerSession(authOptions);
    const validation = createMessageSchema.safeParse(query);

    if (!validation.success) {
      return new NextResponse(JSON.stringify(validation.error), {
        status: 400,
      });
    }

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await prisma.message.create({
      data: {
        message: query.message,
        email: session.user?.email,
      },
      include: {
        User: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    pusherServer.trigger('chat', 'new-message', {
      message: `${JSON.stringify(server)}\n\n`,
    });

    return new NextResponse(JSON.stringify(server), { status: 200 });
  } catch (error) {
    console.log('[SEND_MESSAGE_ERROR]', error);
  }
}

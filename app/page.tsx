import Navbar from '@/components/Navbar';
import TimerPomodoro from '@/components/TimerPomodoro';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import ChatBox from '@/components/chat-box/ChatBox';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { Session, getServerSession } from 'next-auth';
import Link from 'next/link';

type data = {
  id: string;
  User: {
    image: string | null;
    name: string;
  };
  message: string;
  createdAt: Date;
}[];

export default async function Home() {
  const data = (await prisma.message.findMany({
    select: {
      message: true,
      id: true,
      createdAt: true,
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })) as data;

  const session = (await getServerSession(authOptions)) as Session;

  return (
    <main className="flex min-h-screen w-full flex-col justify-center bg-zinc-50 p-5 dark:bg-zinc-950">
      <Navbar session={session} />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <TimerPomodoro />
          <YoutubeEmbed />
        </div>
        <ChatBox
          data={data}
          session={session}
        />
        <div className="mt-10 flex flex-col items-start gap-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground-400">About</h3>
            <p className="text-xs text-foreground-500">
              Pomobuddy is a productivity app that helps you stay focused and on
              track. it&apos;s a simple app that combines the pomodoro technique
              with a chat room and a youtube video player.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm">
            <p className="text-foreground-500">Crafted by </p>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'https://github.com/aafrzl'}
              className="text-sm text-blue-500 hover:text-blue-600 hover:underline">
              @aafrzl
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

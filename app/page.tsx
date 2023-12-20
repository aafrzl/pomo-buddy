import Navbar from '@/components/Navbar';
import TimerPomodoro from '@/components/TimerPomodoro';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import ChatBox from '@/components/chat-box/ChatBox';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { Session, getServerSession } from 'next-auth';

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
      </div>
    </main>
  );
}

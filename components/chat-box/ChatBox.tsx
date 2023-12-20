'use client';

import { pusherClient } from '@/lib/pusher';
import { useTimer } from '@/store/timer';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
} from '@nextui-org/react';
import { MessageCircle } from 'lucide-react';
import { Session } from 'next-auth';
import { useEffect, useRef, useState } from 'react';
import ChatDisable from './ChatDisable';
import ChatInput from './ChatInput';
import ChatItem from './ChatItem';

interface ChatProps {
  session: Session;
  data: {
    id: string;
    User: {
      image: string | null;
      name: string;
    };
    message: string;
    createdAt: Date;
  }[];
}

export default function ChatBox({ data, session }: ChatProps) {
  const { status, timer } = useTimer();
  const chatRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState(data);

  useEffect(() => {
    const channel = pusherClient.subscribe('chat');

    channel.unbind('new-message');
    channel.bind('new-message', (data: any) => {
      const parsedData = JSON.parse(data.message);
      setMessages((prev) => [...prev, parsedData]);
    });

    return () => {
      channel.unbind('new-message');
      pusherClient.unsubscribe('chat');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card
      shadow="sm"
      className="max-h-[400px] xl:max-h-full">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <h4 className="text-large font-semibold">Chat Global</h4>
        <p className="text-xs">
          Chat with other users, share your experience and make new friends!
        </p>
      </CardHeader>
      <CardBody>
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <MessageCircle className="h-12 w-12" />
            <p className="text-sm text-gray-500">
              No messages yet, be the first to send a message!
            </p>
          </div>
        ) : (
          <ScrollShadow
            hideScrollBar
            className="max-h-[500px] w-full">
            {messages.map((item) => (
              <ChatItem
                key={item.id}
                avatar={item.User.image as string}
                username={item.User.name}
                message={item.message}
                time={item.createdAt}
              />
            ))}
            <div ref={chatRef} />
          </ScrollShadow>
        )}
      </CardBody>
      <CardFooter className="my-1 flex items-center justify-center">
        {!session ? (
          <ChatDisable title="You need to login first to use chat features" />
        ) : status === 'focus' && !timer.isPaused ? (
          <ChatDisable title="You can't chat while you're focusing" />
        ) : (
          <ChatInput />
        )}
      </CardFooter>
    </Card>
  );
}

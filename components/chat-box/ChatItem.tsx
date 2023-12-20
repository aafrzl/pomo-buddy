import { Avatar } from '@nextui-org/react';

interface ChatItemProps {
  avatar: string;
  username: string;
  message: string;
  time: Date;
}

export default function ChatItem({
  avatar,
  username,
  message,
  time,
}: ChatItemProps) {
  return (
    <div className="relative flex w-full cursor-pointer items-center rounded-md p-4 transition hover:bg-zinc-600/50">
      <div className="group flex w-full items-start gap-x-3">
        <Avatar
          src={
            avatar === null
              ? `https://ui-avatars.com/api/?name=${username}`
              : avatar
          }
          className="h-8 w-8"
        />
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold">{username}</p>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {new Date(time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">{message}</p>
        </div>
      </div>
    </div>
  );
}

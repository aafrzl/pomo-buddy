import { Ban } from 'lucide-react';
import React from 'react';

export default function ChatDisable({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-x-5">
      <Ban className="h-8 w-8 text-zinc-500 dark:text-zinc-200" />
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">
          Chat Disable
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{title}</p>
      </div>
    </div>
  );
}

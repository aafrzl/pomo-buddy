import dataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
}

export default function EmojiPicker({ onChange }: EmojiPickerProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <Smile className="cursor-pointer text-zinc-500 hover:text-zinc-600 dark:text-zinc-400" />
      </PopoverTrigger>
      <PopoverContent className="border-none bg-transparent shadow-none">
        <Picker
          data={dataEmoji}
          theme={resolvedTheme}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
}

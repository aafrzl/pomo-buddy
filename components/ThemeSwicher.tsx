'use client';

import { useTheme } from 'next-themes';

import { Button } from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      size="sm"
      variant="flat"
      color='success'
      className='h-10 w-10 rounded-xl'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};

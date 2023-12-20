'use client';

import { Button } from '@nextui-org/react';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface Props {
  onClick?: () => void;
  title: string;
}

function IconGoogle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      className={className}
      viewBox="0 0 488 512">
      <path
        stroke="none"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      />
    </svg>
  );
}

export function Login({ onClick, title }: Props) {
  return (
    <Button
      onClick={onClick}
      variant="solid"
      color="secondary"
      className="flex items-center">
      <IconGoogle className="h-5 w-5 text-zinc-100" />
      <p className="text-sm font-semibold text-zinc-100">{title}</p>
    </Button>
  );
}

export function Logout() {
  return (
    <Button
      onClick={() => signOut()}
      color="danger">
      <LogOutIcon className="h-5 w-5" />
      <p className="text-sm font-semibold">Logout</p>
    </Button>
  );
}

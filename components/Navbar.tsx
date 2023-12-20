'use client';

import { Avatar } from '@nextui-org/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { Login, Logout } from './Buttons';
import { ThemeSwitcher } from './ThemeSwicher';

interface Props {
  session: Session;
}

export default function Navbar({ session }: Props) {
  return (
    <div className="flex w-full items-center justify-between text-foreground">
      {session ? (
        <div className="inline-flex items-center gap-2">
          <Avatar src={String(session.user?.image)} />
          <div className="flex flex-col">
            <p className="font-semibold">Welcome! to pomobuddy</p>
            <p className="text-sm text-foreground-400">{session.user?.name}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-x-2">
          <h3 className="text-lg font-semibold">Welcome! to pomobuddy</h3>
          <p className="text-sm text-foreground-400">
            Sign in for a better experience
          </p>
        </div>
      )}
      <div className="inline-flex items-center gap-2">
        {!session ? (
          <Login
            onClick={() => signIn('google')}
            title={'Sign in with Google'}
          />
        ) : (
          <Logout />
        )}
        <ThemeSwitcher />
      </div>
    </div>
  );
}

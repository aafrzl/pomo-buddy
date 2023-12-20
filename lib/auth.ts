import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './db';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET),
    }),
  ],
};

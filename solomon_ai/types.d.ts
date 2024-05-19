// types.d.ts
import { Session as NextAuthSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends NextAuthSession {
    id: number;
    name: string;
    image: string;
  }
}


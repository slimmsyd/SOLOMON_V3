// /types/next-auth.d.ts

// next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session and user types to include the userId property
   */
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

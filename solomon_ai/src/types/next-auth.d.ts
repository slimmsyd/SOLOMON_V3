// /types/next-auth.d.ts

// next-auth.d.ts
import 'next-auth';
import { User as NextAuthUser, Session } from "next-auth";

declare module 'next-auth' {
  /**
   * Extends the built-in session and user types to include the userId property
   */
  interface User extends NextAuthUser {
    id: string;
    username: string; // Adding the username property
  }


  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
    }
  }
}

//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession['user'];
//   }
// }

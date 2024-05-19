// types.d.ts
import { Session as NextAuthSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends NextAuthSession {
    id: number;
    name: string;
    image: string;
  }
}

// types.ts
// types.ts
export interface User {
  id: string;
  username: string;
  email: string;
  // Add other properties as needed
}


// types.ts
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Conversation {
  id: number;
  title: string;
  participants: User[];
  messages: string[];
}

export type SetConversations = (conversations: Conversation[] | ((prev: Conversation[]) => Conversation[])) => void;
export type SetCurrentConversationId = (id: number) => void;

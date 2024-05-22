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
  conversationId: number;
  title: string;
}

export interface Message {
  userContent: string;
  botResponse: string;
  firstConvo: boolean;
}


export type SetConversations = (conversations: Conversation[] | ((prev: Conversation[]) => Conversation[])) => void;
export type SetCurrentConversationId = (id: number) => void;

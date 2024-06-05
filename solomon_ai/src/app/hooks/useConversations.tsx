import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Conversation } from "../../../types";
interface User {
  id: number; 
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // Add other user properties if needed
}

// interface Conversation { 
//   id: number;
//   participants: User[];
//   messages: string[]
// }

export default function useConversations(session: any) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchConversations() {
            if (!session?.user?.id) return;
            setLoading(true);

            const cache = sessionStorage.getItem("conversations");
            const timestamp = localStorage.getItem("conversations_timestamp");
            const now = Date.now();
            const cacheDuration = 5 * 60 * 1000; // Cache duration in milliseconds
      


   
                try {
                  setLoading(true);
                  const response = await fetch(
                    `/api/userConversations?userId=${session.user.id}`
                  );
                  if (!response.ok) throw new Error("Failed to fetch conversations");
        
                  const fetchedConversations = await response.json();


                  setConversations(fetchedConversations);
                  sessionStorage.setItem(
                    "conversations",
                    JSON.stringify(fetchedConversations)
                  );
                  localStorage.setItem("conversations_timestamp", now.toString());
                } catch (error) {
                  console.error("Error fetching conversations:", error);
                } finally {
                  setLoading(false);
                }
            }
        
            fetchConversations();
          }, [session]);

    return { conversations, isLoading, setConversations };
}

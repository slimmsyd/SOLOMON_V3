import { useEffect, useState } from "react";

export default function useConversations(session) {
    const [conversations, setConversations] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchConversations() {
            if (!session?.user?.id) return;
            setLoading(true);

            const cache = localStorage.getItem("conversations");
            const timestamp = localStorage.getItem("conversations_timestamp");
            const now = Date.now();
            const cacheDuration = 5 * 60 * 1000; // Cache duration in milliseconds
      
            if (cache && timestamp && now - parseInt(timestamp) < cacheDuration) {
                try {
                  const cachedData = JSON.parse(cache);
                  setConversations(cachedData);
                  setLoading(false);
                } catch (error) {
                  setLoading(true);
                  console.error("Failed to parse cached conversations:", error);
                  localStorage.removeItem("conversations");
                  localStorage.removeItem("conversations_timestamp");
                }
              } else {
                try {
                  setLoading(true);
                  const response = await fetch(
                    `/api/userConversations?userId=${session.user.id}`
                  );
                  if (!response.ok) throw new Error("Failed to fetch conversations");
        
                  const fetchedConversations = await response.json();
                  setConversations(fetchedConversations);
                  localStorage.setItem(
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
            }
        
            fetchConversations();
          }, [session]);

    return { conversations, isLoading, setConversations };
}

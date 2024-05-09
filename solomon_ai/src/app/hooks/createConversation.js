import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useCreateConversation(
  session,
  setConversations,
  setCurrentConversationId
) {
  const [newTitle, setNewTitle] = useState("");
  const [isCreateLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataId, setdataId] = useState(null);
  const router = useRouter(); // Initialize the router

  const createConversation = async () => {

    console.log("Submit has been made");
    if (!session || !session.user || !session.user.id) {
      console.error("No user session available");
      setError("No user session available");
      return;
    }

    setIsLoading(true);
    try {
      let userId = session.user.id;
      console.log("Logging userId", userId);

      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: [Number(userId)],
          title: newTitle || "New Chat",
        }),
      });
      const data = await response.json();

      console.log("Logging the data after submit has been made", data);

      if (response.ok) {
        setConversations((prev) => {
          const updatedConversations = [
            ...prev,
            { id: data.id, title: data.title },
          ];
          // Update local storage with new conversation list
          localStorage.setItem(
            "conversations",
            JSON.stringify(updatedConversations)
          );
          return updatedConversations;
        });

        if(!response.ok) { 
          console.log("Logging the body Resposne", response)
        }
        setCurrentConversationId(data.id);
        setNewTitle(""); // Reset title input
        console.log(`Conversation created successfully with ID: ${data.id}`);

        // router.push(`/chat/${session.user.id}/${data.id}`, undefined, {
        //   shallow: true,
        // });

        return data.id; // Return the new conversation ID
      } else {
        throw new Error(data.message || "Failed to create conversation");
      }
    } catch (error) {
      console.error("Failed to create conversation:", error, "user session", session);
      setError(error.message);
      return null; // Return null in case of error
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createConversation,
    newTitle,
    setNewTitle,
    isCreateLoading,
    error,
    dataId,
  };
}

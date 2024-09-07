import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


//Session gate Funciton -> Middlewhere
export const useSessionGate = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const maxRetries = 3;
  let retryCount = 0;

  useEffect(() => {

    
    const checkSubscriptionStatus = async () => {
      if (status === "loading") return; // Wait until the session is ready

      if (!session) {
        // No session, redirect to login
        console.log("No session found, redirecting to login...");
        router.push("/login");
        return;
      }

      // Check if the user has a paymentIntentId (active subscription)
      while (retryCount < maxRetries && loading) {
        try {
          const res = await fetch("/api/get-subscription-id", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: session?.user.id }),
          });
          const data = await res.json();

          if (!data.paymentIntentId) {
            // User does not have an active subscription, redirect to login
            console.log("User does not have an active subscription.");
            router.push("/login");
            return;
          } else {
            // User has an active subscription
            console.log("User has an active subscription.");
            setLoading(false);
            break;
          }
        } catch (error) {
          retryCount += 1;
          console.log(`Retrying... (${retryCount}/${maxRetries})`);
          await new Promise((res) =>
            setTimeout(res, 1000 * Math.pow(2, retryCount))
          ); // Exponential backoff

          if (retryCount >= maxRetries) {
            console.error("Failed to retrieve paymentIntentId after retries.");
            router.push("/auth/login");
            return;
          }
        }
      }
    };

    checkSubscriptionStatus();
  }, [session, status, router]);

  return { loading };
};

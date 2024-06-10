import { getSession } from "next-auth/react";

// Define the interface for user information
interface UserInfo {
  lifePathNumber: string;
  zodiacSign: string;
  religion: string;
  ennealogy: string;
  birthday: string;
  mylesBridgeType: string;
  cardologyNumber: string;
}

export async function fetchUserInfo(userId: string): Promise<UserInfo | null> {
  console.log("Loggin the user Id", typeof userId);
  console.log("logging the user Id", userId);
  try {
    const response = await fetch(`/api/getUserInfo?userId=${userId}`);
    const data = await response.json();

    if (response.ok) {
      const { lifePathNumber, zodiacSign, religion, ennealogy, birthday, cardologyNumber, mylesBridgeType  } = data.data;
      console.log("Logging the response here in profile", data);

      const session = await getSession();
      console.log("Loggin session", session);
      if (session) {
        sessionStorage.setItem("lifePathNumber", lifePathNumber);
        sessionStorage.setItem("zodiacSign", zodiacSign);
        sessionStorage.setItem("religion", religion);
        sessionStorage.setItem("ennealogy", ennealogy);
      }
      return { lifePathNumber, zodiacSign, religion, ennealogy, birthday, cardologyNumber, mylesBridgeType  };
    } else {
      console.error("Failed to retrieve user information:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
}

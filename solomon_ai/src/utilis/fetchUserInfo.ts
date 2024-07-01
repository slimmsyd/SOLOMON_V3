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
  nameNumerolgyNumber: string;
}

export async function fetchUserInfo(userId: string): Promise<UserInfo | null> {

  try {
    const response = await fetch(`/api/getUserInfo?userId=${userId}`);
    const data = await response.json();

    if (response.ok) {
      const { lifePathNumber, zodiacSign, religion, ennealogy, birthday, cardologyNumber, mylesBridgeType, nameNumerolgyNumber  } = data.data;

      const session = await getSession();
      if (session) {
        sessionStorage.setItem("lifePathNumber", lifePathNumber);
        sessionStorage.setItem("zodiacSign", zodiacSign);
        sessionStorage.setItem("religion", religion);
        sessionStorage.setItem("mylesBridgeType", mylesBridgeType);
        sessionStorage.setItem("cardologyNumber", cardologyNumber);
        sessionStorage.setItem("nameNumerolgyNumber", nameNumerolgyNumber);
        sessionStorage.setItem("ennealogy", ennealogy);


      }
      return { lifePathNumber, zodiacSign, religion, ennealogy, birthday, cardologyNumber, mylesBridgeType, nameNumerolgyNumber  };
    } else {
      console.error("Failed to retrieve user information:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
}

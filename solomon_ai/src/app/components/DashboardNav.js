import "../globals.css";
import Link from "next/link";
import styles from "../../styles/signup.module.css";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardNav({ togglePosition, isExpanded }) {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    async function checkSession() {
      let username;
      let email;
      if (status === "loading") {
        // Log that the session is loading, wait for session check to complete
        // console.log("Session is loading...");
        return;
      }

      if (status === "unauthenticated") {
        // Handle unauthenticated status by redirecting to the home page
        console.log("No session found, redirecting...");
        router.push("/");
      } else if (status === "authenticated") {
        // If authenticated, fetch the session to ensure it's up to date
        // console.log(
        //   "Session is authenticated, confirming session data...",
        //   status
        // );
        const currentSession = await getSession();

        username = session.user.email;
        console.log("Logging the userName", userName)
        console.log("Logging the session", session)
        email = session.user.email;

        let modString = username[0].toUpperCase();
        setUserName(modString);
        setUserEmail(email);

        // Optionally, handle the session data here, e.g., setting user state
      }
    }

    checkSession();
  }, [status, router]);

  const handleSignOut = () => {
    // Calling signOut with a callback URL
    signOut({ callbackUrl: "/login" });
  };

  const toggleNavVisibility = (visible) => {
    console.log("Proikle Nav is being logged");
    setIsNavVisible(visible);
  };

  return (
    <>
      <nav className="navDashboard">
        <div
          className={`${styles.logo_wrapper} flex flex-row sm:flex-row gap-3`}
        >
          <div className="openChatMobile" onClick={togglePosition}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
                fill="white"
              ></path>
            </svg>
          </div>

          <Link className="flex flex-row  items-center cursor-pointer" href="/">
            <span className={styles.icon_container}>S</span>
            <span className={styles.logo_text}>Solomon_AI</span>
          </Link>
        </div>

        <div className={styles.mobile_nav_container}>
          <button className={styles.hamburger_div}>
            <i className={`${styles.icon}`}></i>
          </button>
        </div>

        <div
          className="profileNav"
          onMouseEnter={() => toggleNavVisibility(true)}
        >
          <span className={styles.profile_logo}>
            <span>{userName}</span>
          </span>
        </div>

        <div
          className={`userNavPoup ${isNavVisible ? "visible" : ""}`}
          style={{ opacity: isNavVisible ? 1 : 0 }}
          onMouseLeave={() => toggleNavVisibility(false)}
        >
          <div>
            <span>{userEmail}</span>
          </div>

          <div className="underLine"></div>

          <button className="usersNavLink ">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-md"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
                fill="currentColor"
              ></path>
              <path
                d="M4.5 21C4.5 17.7804 6.82883 15.0685 10 14.2516"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              ></path>
              <circle
                cx="15.625"
                cy="15.625"
                r="1.625"
                fill="currentColor"
              ></circle>
              <circle
                cx="20.125"
                cy="15.625"
                r="1.625"
                fill="currentColor"
              ></circle>
              <circle
                cx="20.125"
                cy="20.125"
                r="1.625"
                fill="currentColor"
              ></circle>
              <circle
                cx="15.625"
                cy="20.125"
                r="1.625"
                fill="currentColor"
              ></circle>
            </svg>
            <span>Account</span>
          </button>

          <button className="usersNavLink">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-md"
            >
              <path
                d="M11.4284 2.39822C11.7719 2.15891 12.2281 2.15891 12.5716 2.39822L15.0347 4.11412C15.1532 4.19667 15.2882 4.25257 15.4303 4.27799L18.3853 4.80632C18.7974 4.88 19.12 5.2026 19.1937 5.61471L19.722 8.56969C19.7474 8.71185 19.8033 8.84682 19.8859 8.96531L21.6018 11.4284C21.8411 11.7719 21.8411 12.2281 21.6018 12.5716L19.8859 15.0347C19.8033 15.1532 19.7474 15.2882 19.722 15.4303L19.1937 18.3853C19.12 18.7974 18.7974 19.12 18.3853 19.1937L15.4303 19.722C15.2881 19.7474 15.1532 19.8033 15.0347 19.8859L12.5716 21.6018C12.2281 21.8411 11.7719 21.8411 11.4284 21.6018L8.96531 19.8859C8.84682 19.8033 8.71185 19.7474 8.56969 19.722L5.61471 19.1937C5.2026 19.12 4.88 18.7974 4.80632 18.3853L4.27799 15.4303C4.25257 15.2881 4.19667 15.1532 4.11412 15.0347L2.39822 12.5716C2.15891 12.2281 2.15891 11.7719 2.39822 11.4284L4.11412 8.96531C4.19667 8.84682 4.25257 8.71185 4.27799 8.56969L4.80632 5.61471C4.88 5.2026 5.2026 4.88 5.61471 4.80632L8.56969 4.27799C8.71185 4.25257 8.84682 4.19667 8.96531 4.11412L11.4284 2.39822Z"
                stroke="currentColor"
                stroke-width="2"
              ></path>
              <path
                d="M11.5876 8.10179C11.7862 7.81201 12.2138 7.81201 12.4124 8.10179L13.4865 9.66899C13.5515 9.76386 13.6473 9.83341 13.7576 9.86593L15.58 10.4031C15.9169 10.5025 16.0491 10.9092 15.8349 11.1876L14.6763 12.6934C14.6061 12.7846 14.5696 12.8971 14.5727 13.0121L14.625 14.9113C14.6346 15.2625 14.2886 15.5138 13.9576 15.3961L12.1675 14.7596C12.0592 14.721 11.9408 14.721 11.8325 14.7596L10.0424 15.3961C9.71135 15.5138 9.36537 15.2625 9.37502 14.9113L9.42726 13.0121C9.43042 12.8971 9.39385 12.7846 9.32372 12.6934L8.16514 11.1876C7.9509 10.9092 8.08306 10.5025 8.42003 10.4031L10.2424 9.86593C10.3527 9.83341 10.4485 9.76386 10.5135 9.66899L11.5876 8.10179Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Upgrade now</span>
          </button>

          <button className="usersNavLink">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-md"
            >
              <circle
                cx="6.75"
                cy="6.75"
                r="3.25"
                stroke="currentColor"
                stroke-width="2"
              ></circle>
              <circle
                cx="17.25"
                cy="6.75"
                r="3.25"
                stroke="currentColor"
                stroke-width="2"
              ></circle>
              <circle
                cx="6.75"
                cy="17.25"
                r="3.25"
                stroke="currentColor"
                stroke-width="2"
              ></circle>
              <circle
                cx="17.25"
                cy="17.25"
                r="3.25"
                stroke="currentColor"
                stroke-width="2"
              ></circle>
            </svg>
            <span>Share</span>
          </button>
          <button onClick={handleSignOut} className="usersNavLink">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-md"
            >
              <path
                d="M11 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              ></path>
              <path
                d="M20 12H11M20 12L16 16M20 12L16 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span>Signout</span>
          </button>
        </div>
      </nav>
    </>
  );
}

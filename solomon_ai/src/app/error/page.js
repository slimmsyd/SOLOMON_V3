"use client";

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import
import { useSession } from 'next-auth/react';

const ErrorPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect if unauthenticated
      router.push('/login');
    },
  });

  // Correct conditional logic to check session status
  const message = status === "unauthenticated" || status === "loading"
    ? "You are not signed in"
    : "An unexpected error has occurred";

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <p>Error: {message}</p>
    </div>
  );
};

// ErrorPage.getInitialProps = ({ res, err })pdated ated  => {
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   return { statusCode };
// };

export default ErrorPage;

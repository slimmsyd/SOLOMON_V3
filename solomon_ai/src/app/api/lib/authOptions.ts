
 



import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { db } from "./db";
import bcrypt from "bcrypt";
require('dotenv').config()


function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}



export const authOptions: NextAuthOptions = {
  debug: true, // Set debug to true to see more detailed error logs
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },
  pages: {
    signIn: "/Login",
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this environment variable is set in your production environment

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email..." },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");

          return null;
        }
        // If no error and we have user data, return it
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!existingUser) {
          console.log("Incorrect password");

          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          console.log("Incorrect password");

          return null;
        }
        // Return null if user data could not be retrieved
        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),

  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id; // Make sure to assign user.id which is usually a string or number
        token.email = user.email;
        token.username = user.username; // Ensure username is also added to the JWT
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.uid) {
        session.user.id = token.uid; // Ensure this attribute matches your User model
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  
   
  }
}

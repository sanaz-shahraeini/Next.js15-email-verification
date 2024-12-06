import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db, accounts, sessions, users, verificationTokens } from "./schema"
import { SignJWT, jwtVerify } from "jose"
import { encode, decode } from "next-auth/jwt"
import { v4 as uuidv4 } from 'uuid'

// Create a secret key for JWT signing
const secret = process.env.NEXTAUTH_SECRET || uuidv4()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
  secret: secret,    
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
})
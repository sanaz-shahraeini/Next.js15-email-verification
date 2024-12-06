# Setting Up Magic Link Authentication
## Next.js + Auth.js + Drizzle ORM + Neon PostgreSQL

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Setup](#environment-setup)
4. [Database Configuration](#database-configuration)
5. [Authentication Setup](#authentication-setup)
6. [Component Creation](#component-creation)
7. [Security & Testing](#security--testing)

## Prerequisites

- Node.js installed (v16.8 or later)
- PostgreSQL database (Neon)
- SMTP email service (e.g., Gmail)
- Git for version control

## Installation

```bash
# Install required packages
npm install next-auth@beta @auth/drizzle-adapter drizzle-orm nodemailer
npm install -D drizzle-kit @types/nodemailer
```

## Environment Setup

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL='your-neon-postgres-url'

# Auth
NEXTAUTH_SECRET='your-uuid-secret'
NEXTAUTH_URL='http://localhost:3000'

# Email (Gmail example)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-specific-password
EMAIL_FROM=your-email@gmail.com
```

## Database Configuration

### 1. Schema Definition (src/schema.ts)

```typescript
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  name: text("name"),
  image: text("image"),
});

export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").notNull().references(() => users.id),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
```

### 2. Database Migration (src/migrate.ts)

```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Migration started...');
    // Add migration logic here
    console.log('Migration completed.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

main();
```

## Authentication Setup

### 1. Auth Configuration (src/auth.ts)

```typescript
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
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
  pages: {
    signIn: '/login',
    error: '/error',
  },
});
```

### 2. API Route (src/app/api/auth/[...nextauth]/route.ts)

```typescript
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

## Component Creation

### 1. Sign-in Component (src/components/sign-in.tsx)

```typescript
'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/',
      });

      if (result?.error) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Sign in with Email'}
      </button>
      {status === 'success' && (
        <p className="text-sm text-green-600">Check your email for the magic link!</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
```

### 2. Login Page (src/app/login/page.tsx)

```typescript
import { SignIn } from "@/components/sign-in";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <h2 className="text-center text-3xl font-bold">Sign in to your account</h2>
        <SignIn />
      </div>
    </div>
  );
}
```

### 3. Middleware (src/middleware.ts)

```typescript
import { auth } from "@/auth";

export const config = {
  matcher: ['/protected/:path*', '/api/protected/:path*']
};

export async function middleware(request: Request) {
  const session = await auth();
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
}
```

## Security & Testing

### Email Setup (Gmail)

1. Enable 2-factor authentication
2. Generate app password:
   - Go to Google Account settings
   - Security → App passwords
   - Generate new password
   - Use in EMAIL_SERVER_PASSWORD

### Database Migration

```bash
# Generate migration
npx drizzle-kit generate:pg

# Run migration
npx tsx src/migrate.ts
```

### Testing Process

1. Start development server:
```bash
npm run dev
```

2. Test authentication:
   - Visit `/login`
   - Enter email
   - Check email for magic link
   - Click link to authenticate

### Security Checklist

- [ ] Set appropriate token expiry
- [ ] Use HTTPS in production
- [ ] Secure environment variables
- [ ] Implement rate limiting
- [ ] Regular token cleanup
- [ ] Monitor authentication attempts
- [ ] Validate email addresses
- [ ] Set secure session cookies

### Troubleshooting

1. Email Issues:
   - Verify SMTP credentials
   - Check spam folder
   - Confirm email service settings

2. Database Problems:
   - Verify connection string
   - Check network access
   - Confirm permissions

3. Authentication Errors:
   - Verify NEXTAUTH_SECRET
   - Check token expiration
   - Review session configuration

## Production Deployment

1. Set up production environment variables
2. Configure production database
3. Enable HTTPS
4. Set up monitoring
5. Configure error logging
6. Test email delivery
7. Implement rate limiting
8. Set up backup system

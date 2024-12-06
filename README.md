# Modern Database Management with Next.js and Drizzle ORM

A modern, full-stack web application built with Next.js, PostgreSQL, and Drizzle ORM, featuring secure authentication and a beautiful user interface.

## 🚀 Features

### Authentication System
- **NextAuth.js Integration** (v5 beta)
  - Secure magic link authentication
  - Email-based user verification
  - JWT token management
  - Session handling

### Database Management
- **PostgreSQL Database**
  - Type-safe database operations with Drizzle ORM
  - Efficient database migrations
  - Structured schema management

### Modern UI/UX
- **Responsive Design**
  - Clean and modern interface
  - Gradient effects and animations
  - Mobile-friendly layout
- **Tailwind CSS** for styling

## 🛠 Tech Stack

### Frontend
- Next.js 15
- React
- Tailwind CSS

### Backend
- Next.js API Routes
- PostgreSQL
- Drizzle ORM

### Authentication & Security
- NextAuth.js
- JWT Tokens
- Nodemailer for email services

## 📦 Project Structure

```
drizzle-psql/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── login/
│   │   └── page.tsx
│   ├── lib/
│   │   └── jwtTokenControls.ts
│   └── schema.ts
├── drizzle/
│   └── migrations/
├── .env
└── drizzle.config.ts
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
cd drizzle-psql
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file with:
```env
DATABASE_URL=your_postgresql_url
NEXTAUTH_SECRET=your_secret
SMTP_USER=your_email
SMTP_PASSWORD=your_password
```

4. **Run database migrations**
```bash
npm run db:generate
npm run db:push
```

5. **Start the development server**
```bash
npm run dev
```

## 📝 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run db:generate`: Generate database migrations
- `npm run db:push`: Push migrations to database
- `npm run db:migrate`: Run database migrations

## 🔐 Authentication Flow

1. User visits login page
2. Enters email address
3. Receives magic link via email
4. Clicks link to authenticate
5. JWT token generated and session created

## 🛡 Security Features

- Secure magic link authentication
- JWT token-based sessions
- Environment variable protection
- Type-safe database operations

## 📚 Dependencies

### Core
- next: ^15.0.3
- react: ^19.0.0
- drizzle-orm: ^0.36.4
- next-auth: ^5.0.0-beta.25

### Database
- pg: ^8.13.1
- postgres: ^3.4.5

### Authentication
- @auth/drizzle-adapter: ^1.7.4
- nodemailer: ^6.9.16
- jose: ^5.9.6

### Development
- typescript
- tailwindcss
- drizzle-kit

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/*
Behind the scenes, NextAuth.js uses Next.js API Routes to handle requests to /api/auth/* and provides the following routes:
GET /api/auth/signin
POST /api/auth/signin/:provider
GET/POST /api/auth/callback/:provider
GET /api/auth/signout
POST /api/auth/signout
GET /api/auth/session
GET /api/auth/csrf
GET /api/auth/providers
*/

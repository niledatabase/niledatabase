import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import NileAdapter from "@/adapter-nile/src/index"
import { Pool } from 'pg'
import "dotenv/config";


const pool = new Pool({
    host: process.env.NILE_DB_HOST,
    user: process.env.NILE_USER,
    max: 1, // no need for a serious pool for auth in a demo app. For now, this is separate from the Nile SDK pool used elsewhere.
    password: process.env.NILE_PASSWORD,
    database: process.env.NILE_DATABASE, })

const handler = NextAuth({
    adapter: NileAdapter(pool),
    debug: true,
    providers: [
      Email({
        server: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
  })

export { handler as GET, handler as POST }  
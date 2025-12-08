import type {
  Adapter,
  AdapterUser,
  VerificationToken,
  AdapterSession,
} from '@auth/core/adapters';

// TODO: Move to Nile SDK
import type { Pool } from 'pg';

export function mapExpiresAt(account: any): any {
  const expires_at: number = parseInt(account.expires_at);
  return {
    ...account,
    expires_at,
  };
}

/**
 * ## Setup
 *
 * The SQL schema for the tables used by this adapter is as follows.
 * Learn more about the models at NextAuth doc page on [Database Models](https://authjs.dev/getting-started/adapters#models).
 *
 * ```sql
 * CREATE TABLE IF NOT EXISTS "accounts" (
 *     "userId" uuid NOT NULL,
 *     "type" text NOT NULL,
 *     "provider" text NOT NULL,
 *     "providerAccountId" text NOT NULL,
 *     "refresh_token" text,
 *     "access_token" text,
 *     "expires_at" integer,
 *     "token_type" text,
 *     "scope" text,
 *     "id_token" text,
 *     "session_state" text,
 *     CONSTRAINT account_provider_providerAccountId_pk PRIMARY KEY("provider","providerAccountId")
 *    -- ,CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users.users"("id") ON DELETE cascade ON UPDATE no action;
 * );
 *
 * CREATE TABLE IF NOT EXISTS "sessions" (
 *     "sessionToken" text PRIMARY KEY NOT NULL,
 *     "userId" text NOT NULL,
 *     "expires" timestamp NOT NULL
 *     --,CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users.users"("id") ON DELETE cascade ON UPDATE no action;
 * );
 *
 * CREATE TABLE IF NOT EXISTS "verification_token" (
 *     "identifier" text NOT NULL,
 *     "token" text NOT NULL,
 *     "expires" timestamp NOT NULL,
 *     CONSTRAINT verificationToken_identifier_token_pk PRIMARY KEY("identifier","token")
 * );
 *
 * -- users table is built-in to Nile, but we need to extend it for NextAuth
 *
 * alter table users.users add column "email_verified" timestamp;
 *
 * ```
 *
 * ```typescript title="auth.ts"
 * import NextAuth from "next-auth"
 * import GoogleProvider from "next-auth/providers/google"
 * import NileAdapter from "@/adapter-nile/src/index"
 * import { Pool } from 'pg'
 *
 * const pool = new Pool({
 *   host: process.env.NILE_DB_HOST,
 *   user: process.env.NILE_USER,
 *   max: 1,
 *   password: process.env.NILE_PASSWORD,
 *   database: process.env.NILE_DATABASE, })
 * })
 *
 * export default NextAuth({
 *   adapter: NileAdapter(pool),
 *   providers: [
 *     GoogleProvider({
 *       clientId: process.env.GOOGLE_CLIENT_ID,
 *       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 *     }),
 *   ],
 * })
 * ```
 *
 */

export default function NileAdapter(client: Pool): Adapter {
  return {
    async createVerificationToken(
      verificationToken: VerificationToken,
    ): Promise<VerificationToken> {
      const { identifier, expires, token } = verificationToken;
      const sql = `
          INSERT INTO verification_token ( identifier, expires, token ) 
          VALUES ($1, $2, $3)
          `;
      await client.query(sql, [identifier, expires, token]);
      return verificationToken;
    },
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      const sql = `delete from verification_token
        where identifier = $1 and token = $2
        RETURNING identifier, expires, token `;
      const result = await client.query(sql, [identifier, token]);
      return result.rowCount !== 0 ? result.rows[0] : null;
    },

    async createUser(user: Omit<AdapterUser, 'id'>) {
      const { name, email, emailVerified, image } = user;
      const sql = `
          INSERT INTO users.users (name, email, "emailVerified", picture) 
          VALUES ($1, $2, $3, $4) 
          RETURNING id, name, email, "emailVerified", picture`;
      const result = await client.query(sql, [
        name,
        email,
        emailVerified,
        image,
      ]);
      return result.rows[0];
    },
    async getUser(id) {
      const sql = `select * from users.users where id = $1`;
      try {
        const result = await client.query(sql, [id]);
        return result.rowCount === 0 ? null : result.rows[0];
      } catch (e) {
        return null;
      }
    },
    async getUserByEmail(email) {
      const sql = `select * from users.users where email = $1`;
      const result = await client.query(sql, [email]);
      return result.rowCount !== 0 ? result.rows[0] : null;
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      const sql = `
            select u.* from users.users u join accounts a on u.id = a."userId"
            where 
            a.provider = $1 
            and 
            a."providerAccountId" = $2`;

      const result = await client.query(sql, [provider, providerAccountId]);
      return result.rowCount !== 0 ? result.rows[0] : null;
    },
    async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
      const fetchSql = `select * from users.users where id = $1`;
      const query1 = await client.query(fetchSql, [user.id]);
      const oldUser = query1.rows[0];

      const newUser = {
        ...oldUser,
        ...user,
      };

      const { id, name, email, emailVerified, image } = newUser;
      const updateSql = `
          UPDATE users.users set
          name = $2, email = $3, "emailVerified" = $4, picture = $5
          where id = $1
          RETURNING name, id, email, "emailVerified", picture
        `;
      const query2 = await client.query(updateSql, [
        id,
        name,
        email,
        emailVerified,
        image,
      ]);
      return query2.rows[0];
    },
    async linkAccount(account) {
      const sql = `
        insert into accounts 
        (
          "userId", 
          provider, 
          type, 
          "providerAccountId", 
          access_token,
          expires_at,
          refresh_token,
          id_token,
          scope,
          session_state,
          token_type
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        returning
          "userId", 
          provider, 
          type, 
          "providerAccountId", 
          access_token,
          expires_at,
          refresh_token,
          id_token,
          scope,
          session_state,
          token_type
        `;

      const params = [
        account.userId,
        account.provider,
        account.type,
        account.providerAccountId,
        account.access_token,
        account.expires_at,
        account.refresh_token,
        account.id_token,
        account.scope,
        account.session_state,
        account.token_type,
      ];

      const result = await client.query(sql, params);
      return mapExpiresAt(result.rows[0]);
    },
    async createSession({ sessionToken, userId, expires }) {
      if (userId === undefined) {
        throw Error(`userId is undef in createSession`);
      }
      const sql = `insert into sessions ("userId", expires, "sessionToken")
        values ($1, $2, $3)
        RETURNING "sessionToken", "userId", expires`;

      const result = await client.query(sql, [userId, expires, sessionToken]);
      return result.rows[0];
    },

    async getSessionAndUser(sessionToken: string | undefined): Promise<{
      session: AdapterSession;
      user: AdapterUser;
    } | null> {
      if (sessionToken === undefined) {
        return null;
      }
      const result1 = await client.query(
        `select * from sessions where "sessionToken" = $1`,
        [sessionToken],
      );
      if (result1.rowCount === 0) {
        return null;
      }
      let session: AdapterSession = result1.rows[0];

      const result2 = await client.query(
        'select * from users.users where id = $1',
        [session.userId],
      );
      if (result2.rowCount === 0) {
        return null;
      }
      const user = result2.rows[0];
      return {
        session,
        user,
      };
    },
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
    ): Promise<AdapterSession | null | undefined> {
      const { sessionToken } = session;
      const result1 = await client.query(
        `select * from sessions where "sessionToken" = $1`,
        [sessionToken],
      );
      if (result1.rowCount === 0) {
        return null;
      }
      const originalSession: AdapterSession = result1.rows[0];

      const newSession: AdapterSession = {
        ...originalSession,
        ...session,
      };
      const sql = `
          UPDATE sessions set
          expires = $2
          where "sessionToken" = $1
          `;
      const result = await client.query(sql, [
        newSession.sessionToken,
        newSession.expires,
      ]);
      return result.rows[0];
    },
    async deleteSession(sessionToken) {
      const sql = `delete from sessions where "sessionToken" = $1`;
      await client.query(sql, [sessionToken]);
    },
    async unlinkAccount(partialAccount) {
      const { provider, providerAccountId } = partialAccount;
      const sql = `delete from accounts where "providerAccountId" = $1 and provider = $2`;
      await client.query(sql, [providerAccountId, provider]);
    },
    async deleteUser(userId: string) {
      await client.query(`delete from users.users where id = $1`, [userId]);
      await client.query(`delete from sessions where "userId" = $1`, [userId]);
      await client.query(`delete from accounts where "userId" = $1`, [userId]);
    },
  };
}

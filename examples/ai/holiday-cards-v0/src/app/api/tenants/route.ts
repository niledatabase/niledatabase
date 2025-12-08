import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { tenants, userTenants } from '@/lib/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log('Session:', session);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userTenantsData = await db.query.userTenants.findMany({
    where: (userTenants, { eq }) => eq(userTenants.userId, session.user.id),
    with: {
      tenant: true,
    },
  });

  const tenantsData = userTenantsData.map((ut) => ut.tenant);

  return NextResponse.json(tenantsData);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await request.json();

  // Workaround for THE-2356
  const result = await db.execute(
    sql`INSERT INTO tenants (name) VALUES (${name}) RETURNING *`,
  );
  const newTenant = result.rows[0] as typeof tenants.$inferSelect;
  await db.insert(userTenants).values({
    userId: session.user.id,
    tenantId: newTenant.id,
    role: ['owner'],
  });

  return NextResponse.json(newTenant);
}

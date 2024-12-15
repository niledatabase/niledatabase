import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { teamMembers } from '@/lib/schema';
import { randomUUID } from 'crypto';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const members = await db.query.teamMembers.findMany({
    where: (teamMembers, { eq }) => eq(teamMembers.tenantId, params.id),
  });

  return NextResponse.json(members);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, email, description } = await request.json();

  const newMember = await db.insert(teamMembers).values({
    id: randomUUID(),
    tenantId: params.id,
    name,
    email,
    description,
  }).returning();

  return NextResponse.json(newMember[0]);
}

